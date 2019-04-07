import React, { Component, Fragment, Suspense } from "react";
import "./SearchCat.css";
const SearchCatForm = React.lazy(() => import("./SearchCatForm"));

// Slow version to see fallback
/*const SearchCatForm = React.lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import("./SearchCatForm.jsx")), 10000)
    )
);*/

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
              <Suspense fallback={<div>Loading lazy...</div>}>
                <SearchCatForm
                  addCats={cats => {
                    this.setState({ displayed: false });
                    this.props.addCats(cats);
                  }}
                />
              </Suspense>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default SearchCat;
