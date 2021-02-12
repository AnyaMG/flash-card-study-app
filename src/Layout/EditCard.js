import React, { useState, useEffect } from "react";
import { updateCard, readDeck, readCard } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function EditCard(props) {
  const { deckId, cardId } = useParams(); 
  const history = useHistory();
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    const loadDeck = async () => {
      const deck = await readDeck(deckId);
      setDeckName(deck.name);
    };

    const loadCard = async () => {
      const card = await readCard(cardId);
      setFrontText(card.front);
      setBackText(card.back);
    };
    loadDeck();
    loadCard();
  }, []);

  const handleEditCard = async (e) => {
    e.preventDefault();
    const updatedCard = {
      id: cardId,
      front: frontText,
      back: backText,
      deckId: parseInt(deckId),
    };

    await updateCard(updatedCard);

    history.push(`/decks/${deckId}`);
  };

  const handleFrontChange = (e) => {
    setFrontText(e.target.value);
  };

  const handleBackChange = (e) => {
    setBackText(e.target.value);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h3>{deckName}: Edit Card</h3>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Front
          </label>
          <textarea
            placeholder="Front side of card"
            className="form-control"
            aria-describedby="emailHelp"
            row="2"
            value={frontText}
            onChange={handleFrontChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            rows="2"
            placeholder="Back side of card"
            value={backText}
            onChange={handleBackChange}
          ></textarea>
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          {``} {``} Cancel
        </Link>
        <button onClick={handleEditCard} className="btn btn-primary">
          {``} {``} Save
        </button>
      </form>
    </div>
  );
}
export default EditCard;
