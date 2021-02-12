import React, { useEffect, useState } from "react";

import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function DeckOverview() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deckData, setDeckData] = useState();
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    const loadDeck = async () => {
      const deck = await readDeck(deckId);
      setDeckData(deck);
      setCardsList(deck.cards);
    };
    loadDeck();
  }, []);

  const handleDeleteDeck = async () => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      await deleteCard(cardId);
      setCardsList(cardsList.filter((card) => card.id !== cardId));
    }
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deckData ? deckData.name : null}
          </li>
        </ol>
      </nav>
      <div>
        <h4>{deckData ? deckData.name : null}</h4>
        <p>{deckData ? deckData.description : null}</p>

        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
          {``} {``} Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
          {``} {``} Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          <span className="oi oi-plus" />
          {``} {``} Add Cards
        </Link>
        <button
          onClick={handleDeleteDeck}
          className="btn btn-danger"
          title="Delete deck"
        >
          <span className="oi oi-trash" />
        </button>

        <h2 className="card-title">Cards</h2>
        <br />
        <div>
          {cardsList.map((card) => {
            return (
              <div className="card" key={`card-${card.id}`}>
                <div className="card-body">
                  <div className="container">
                    <div className="row justify-content-start">
                      <div className="col-4">{card.front}</div>

                      <div className="col-4">{card.back}</div>

                      <div className="col-4">
                        <Link
                          to={`/decks/${deckId}/cards/${card.id}/edit`}
                          className="btn btn-secondary"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            handleDeleteCard(card.id);
                          }}
                          className="btn btn-danger"
                          title="Delete deck"
                        >
                          <span className="oi oi-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DeckOverview;
