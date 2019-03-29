import React from 'react'
import { Grid } from 'dragrid'

import './Cats.css'

export function Cats({ cats, moveCat }) {
  return (
    <Grid
      style={{ maxWidth: '100%' }}
      elements={cats}
      renderElement={cat => <div className="Cats-item"><img draggable="false"  src={cat.url} alt="some cat" /></div>}
      onDrop={moveCat}
    />
  )
}

