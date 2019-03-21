import React, { Component, Fragment } from 'react'
import { store } from './redux'
import { Provider, connect } from 'react-redux'
import './App.css'

const Cats = connect(state => ({ cats: state.cats }))(
  ({ cats }) => (
    <ul>
      {cats.map((cat, index) => <li key={index}><img src={cat.url} alt="some cat" /></li>)}
    </ul>
  )
)

class CatInput extends Component {
  state = {
    value: '',
  }

  onChange = (event) => {
    this.setState({ value: event.target.value })
  }

  addCat = () => {
    this.props.addCat(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <Fragment>
        <input type="text" onChange={this.onChange} value={this.state.value} />
        <button onClick={this.addCat}>Add cat</button>
      </Fragment>
    )
  }
}

const AddCat = connect(undefined, dispatch => ({ addCat: url => dispatch({ type: 'ADD_CAT', cat: { url } }) }))(CatInput)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            Reacats
            <AddCat />
          </header>
          <main>
            <Cats />
          </main>
        </div>
      </Provider>
    )
  }
}

export default App
