import React from 'react'
import { connect } from 'react-redux'

export const Cats = connect(state => ({ cats: state.cats }))(
  ({ cats }) => (
    <ul>
      {cats.map((cat, index) => <li key={index}><img src={cat.url} alt="some cat" /></li>)}
    </ul>
  )
)

