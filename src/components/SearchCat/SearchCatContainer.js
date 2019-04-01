import { connect } from "react-redux";
import SearchCat from "./SearchCat";

export default connect(
  state => ({ excludedCats: state.cats.map(c => c.url) }),
  dispatch => ({
    addCats: urls =>
      dispatch({ type: "ADD_CATS", cats: urls.map(url => ({ url })) })
  })
)(SearchCat);
