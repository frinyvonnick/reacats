import React, { Component } from "react";
import Cats from "./Cats";

import CatContext from "../../CatContext";

export class CatsContainer extends Component {
  static contextType = CatContext;
  render() {
    return (
      <Cats
        cats={this.context.cats}
        moveCat={(source, target) =>
          this.context.dispatch({ type: "MOVE_CAT", source, target })
        }
        readCats={cats => this.context.dispatch({ type: "SET_CATS", cats })}
        {...this.props}
      />
    );
  }
}
