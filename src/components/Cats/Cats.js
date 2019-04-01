import React from "react";
import { Grid } from "dragrid";

import "./Cats.css";

export function Cats({ cats, moveCat }) {
  return (
    <Grid
      style={{ maxWidth: "100%", padding: "5px" }}
      elementClassName="Cats-item"
      elements={cats}
      renderElement={cat => (
        <img draggable="false" src={cat.url} alt="some cat" />
      )}
      onDrop={moveCat}
    />
  );
}
