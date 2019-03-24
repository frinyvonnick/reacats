import React from 'react'

export function Cats({ cats }) {
  return (
    <ul>
      {cats.map((cat, index) => <li key={index}><img src={cat.url} alt="some cat" /></li>)}
    </ul>
  )
}

