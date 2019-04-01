import { connect } from "react-redux";

import { Cats } from "./Cats";

export const CatsContainer = connect(
  state => ({ cats: state.cats }),
  dispatch => ({
    moveCat: (source, target) => dispatch({ type: "MOVE_CAT", source, target })
  })
)(Cats);
