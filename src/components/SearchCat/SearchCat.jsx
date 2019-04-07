import React, { Component, Fragment } from "react";
import "./SearchCat.css";
import "./SearchCatForm";
import SearchCatForm from "./SearchCatForm";

class SearchCat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: false
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState(state => ({ displayed: !state.displayed }));
  }

  render() {
    return (
      <Fragment>
        <button className="SearchCat-button" onClick={this.toggleForm}>
          Search cat
        </button>
        {this.state.displayed && (
          <div className="SearchCat-overlay" onClick={this.toggleForm}>
            <div
              className="SearchCat-content"
              onClick={e => e.stopPropagation()}
            >
              <SearchCatForm
                limit={100}
                excludedCats={this.props.excludedCats}
                addCats={cats => {
                  this.setState({ displayed: false });
                  this.props.addCats(cats);
                }}
              />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default SearchCat;
