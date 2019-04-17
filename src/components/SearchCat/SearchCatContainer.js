import React, { useContext } from "react";
import SearchCat from "./SearchCat";
import CatContext from "../../CatContext";

export default function SearchCatContainer(props) {
  const { dispatch, cats } = useContext(CatContext);

  const excludedCats = cats.map(c => c.url);
  const addCats = urls =>
    dispatch({
      type: "ADD_CATS",
      cats: urls.map(url => ({ url }))
    });
  return <SearchCat excludedCats={excludedCats} addCats={addCats} {...props} />;
}
