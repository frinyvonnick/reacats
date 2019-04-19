import React, { Component } from "react";
import Cats from "./Cats";

import CatContext from "../../CatContext";

export class CatsContainer extends Component {
  static contextType = CatContext;
  render() {
    return (
      <Cats
        cats={this.context.cats}
        moveCat={this.context.moveCat}
        readCats={this.context.setCats}
        {...this.props}
      />
    );
  }
}
