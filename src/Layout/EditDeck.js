import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadDeck = async () => {
      const deck = await readDeck(deckId);
      setName(deck.name);
      setDescription(deck.description);
    };
    loadDeck();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeckUpdate = async (e) => {
    e.preventDefault();
    const updatedDeck = {
      "name": name,
      "description": description,
      "id": deckId
    }

    await updateDeck(updatedDeck);
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <h2>Edit Deck</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleName" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Deck Name"
            className="form-control"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Brief description of the deck"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <Link to="/" className="btn btn-secondary">
          {``} {``} Cancel
        </Link>
        <button onClick={handleDeckUpdate} className="btn btn-primary">
          {``} {``} Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
