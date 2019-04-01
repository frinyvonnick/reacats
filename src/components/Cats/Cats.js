import React, { Component } from "react";
import { Grid } from "dragrid";

import "./Cats.css";

class Cats extends Component {
  componentDidMount() {
    const previousCats = localStorage.getItem("cats");
    if (previousCats) {
      console.log(previousCats);
      this.props.readCats(JSON.parse(previousCats));
    }
  }

  componentDidUpdate() {
    localStorage.setItem("cats", JSON.stringify(this.props.cats));
  }

  render() {
    const { cats, moveCat } = this.props;
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
}
export default Cats;
