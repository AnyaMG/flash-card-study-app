import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";

function Home() {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      let allDecks = await listDecks();
      setDeckList(allDecks);
    }
    loadDeck();
  }, []);

  const mappedDecks = deckList.map((deck) => {
    return (
      <DeckList
        key={deck.id}
        description={deck.description}
        cards={deck.cards}
        id={deck.id}
        name={deck.name}
      />
    );
  });

  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary">
        <span className="oi oi-plus" />
        {``} Create Deck
      </Link>
      {mappedDecks}
    </div>
  );
}

export default Home;
