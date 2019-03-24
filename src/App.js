import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'

import { store } from './redux'
import { AddCat, Cats } from './components'

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            Reacats
          </header>
          <main>
            <AddCat />
            <Cats />
          </main>
        </div>
      </Provider>
    )
  }
}

export default App
