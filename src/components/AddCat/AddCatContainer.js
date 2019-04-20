import React, { useContext } from "react";
import { AddCat } from "./AddCat";

import CatContext from "../../CatContext";

export function AddCatContainer(props) {
  const { dispatch } = useContext(CatContext);

  return (
    <AddCat
      addCat={url => dispatch({ type: "ADD_CAT", cat: { url } })}
      {...props}
    />
  );
}
