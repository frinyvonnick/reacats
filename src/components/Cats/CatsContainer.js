import { connect } from "react-redux";

import Cats from "./Cats";

export const CatsContainer = connect(
  state => ({ cats: state.cats }),
  dispatch => ({
    moveCat: (source, target) => dispatch({ type: "MOVE_CAT", source, target }),
    readCats: cats => dispatch({ type: "SET_CATS", cats })
  })
)(Cats);
