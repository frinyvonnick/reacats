import React, { useReducer } from "react";

import { AddCat, Cats } from "./components";

import "./App.css";
import SearchCat from "./components/SearchCat";
import CatContext from "./CatContext";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CAT":
      return [...state, action.cat];
    case "ADD_CATS":
      return [...state, ...action.cats];
    case "SET_CATS":
      return action.cats;
    case "MOVE_CAT": {
      const copy = [...state];
      const element = copy.splice(action.source, 1)[0];
      copy.splice(action.target, 0, element);
      return copy;
    }
    default:
      return state;
  }
}

function App() {
  const [cats, dispatch] = useReducer(reducer, []);
  return (
    <CatContext.Provider value={{ cats, dispatch }}>
      <div className="App">
        <header className="App-header">
          Reacats
          <div className="App-header-buttons">
            <SearchCat />
            <AddCat />
          </div>
        </header>
        <main>
          <Cats />
        </main>
      </div>
    </CatContext.Provider>
  );
}

export default App;
