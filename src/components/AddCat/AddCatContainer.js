import React from "react";
import CatContext from "../../CatContext";

import { AddCat } from "./AddCat";

export function AddCatContainer(props) {
  const { addCat } = React.useContext(CatContext);
  return <AddCat addCat={addCat} {...props} />;
}
