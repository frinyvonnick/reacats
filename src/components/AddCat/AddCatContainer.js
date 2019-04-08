import React, { Component } from "react";
import { AddCat } from "./AddCat";

import CatContext from "../../CatContext";

export class AddCatContainer extends Component {
  static contextType = CatContext;
  render() {
    return (
      <AddCat addCat={url => this.context.addCat({ url })} {...this.props} />
    );
  }
}
