import React from 'react'
import CatContext from '../../CatContext'

import { AddCat } from "./AddCat";

export function AddCatContainer(props) {
  return (
    <CatContext.Consumer>
      {({ addCat }) => <AddCat addCat={addCat} {...props} />}
    </CatContext.Consumer>
  )
} 
