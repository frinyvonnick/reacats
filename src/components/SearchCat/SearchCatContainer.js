import React, { Component } from "react";
import SearchCat from "./SearchCat";
import CatContext from "../../CatContext";

class SearchCatContainer extends Component {
  static contextType = CatContext;
  render() {
    const excludedCats = this.context.cats.map(c => c.url);
    const addCats = urls =>
      this.context.dispatch({
        type: "ADD_CATS",
        cats: urls.map(url => ({ url }))
      });
    return (
      <SearchCat
        excludedCats={excludedCats}
        addCats={addCats}
        {...this.props}
      />
    );
  }
}

export default SearchCatContainer;
