import React, { Component } from "react";
import { Provider } from "react-redux";

import { store } from "./redux";
import { AddCat, Cats } from "./components";

import "./App.css";
import SearchCat from "./components/SearchCat";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
