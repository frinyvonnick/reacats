import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class CatInput extends Component {
  state = {
    value: '',
  }

  onChange = (event) => {
    this.setState({ value: event.target.value })
  }

  addCat = e => {
    if (!e.key === 'Enter') return
    this.props.addCat(this.state.value)
    this.setState({ value: '' })
  }

  render() {
    return (
      <Fragment>
        <input type="text" onChange={this.onChange} value={this.state.value} onKeyPress={this.addCat} />
      </Fragment>
    )
  }
}

export const AddCat = connect(undefined, dispatch => ({ addCat: url => dispatch({ type: 'ADD_CAT', cat: { url } }) }))(CatInput)
