import React, { Component } from "react";

import { AddCat, Cats } from "./components";

import "./App.css";
import SearchCat from "./components/SearchCat";
import CatContext from "./CatContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      addCat: cat => {
        this.state.addCats([cat]);
      },
      addCats: newCats => {
        this.setState(({ cats, ...rest }) => {
          return {
            ...rest,
            cats: [...cats, ...newCats]
          };
        });
      },
      moveCat: (source, target) => {
        this.setState(({ cats, ...rest }) => {
          const copy = [...cats];
          const element = copy.splice(source, 1)[0];
          copy.splice(target, 0, element);

          return {
            ...rest,
            cats: copy
          };
        });
      },
      setCats: cats => {
        this.setState({ cats });
      }
    };
  }

  render() {
    return (
      <CatContext.Provider value={this.state}>
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
}

export default App;
