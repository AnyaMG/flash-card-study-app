import React, { useState } from "react";
import { createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function NewDeck() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deckObj = {
      name: name,
      description: description,
    };
    const newDeck = await createDeck(deckObj);
    newDeck.cards = [];

    history.push(`/decks/${newDeck.id}`);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h2>Create Deck</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleName" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Deck Name"
            className="form-control"
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
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <Link to="/" className="btn btn-secondary">
          {``} {``} Cancel
        </Link>
        <button onClick={handleSubmit} className="btn btn-primary">
          {``} {``} Submit
        </button>
      </form>
    </div>
  );
}

export default NewDeck;
