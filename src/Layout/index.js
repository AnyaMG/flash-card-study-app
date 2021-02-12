import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import NewDeck from "./NewDeck";
import DeckOverview from "./DeckOverview";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { Route, Switch } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/decks/new" exact={true}>
            <NewDeck />
          </Route>
          <Route path="/decks/:deckId" exact={true}>
            <DeckOverview />
          </Route>
          <Route path="/decks/:deckId/edit" exact={true}>
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit" exact={true}>
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
