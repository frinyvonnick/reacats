import { connect } from "react-redux";
import SearchCat from "./SearchCat";

export default connect(
  undefined,
  dispatch => ({
    addCats: urls =>
      dispatch({ type: "ADD_CATS", cats: urls.map(url => ({ url })) })
  })
)(SearchCat);
