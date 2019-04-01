import { connect } from "react-redux";

import { AddCat } from "./AddCat";

export const AddCatContainer = connect(
  undefined,
  dispatch => ({
    addCat: url => dispatch({ type: "ADD_CAT", cat: { url } })
  })
)(AddCat);
