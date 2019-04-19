import React, { Component } from "react";
import "./SearchCat.css";
const SearchCatForm = React.lazy(() => import("./SearchCatForm"));

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
      <div>
        <button className="SearchCat-button" onClick={this.toggleForm}>
          Search cat
        </button>
        {this.state.displayed && (
          <div className="SearchCat-overlay" onClick={this.toggleForm}>
            <div
              className="SearchCat-content"
              onClick={e => e.stopPropagation()}
            >
              <React.Suspense fallback="Loading component...">
                <SearchCatForm
                  limit={100}
                  excludedCats={this.props.excludedCats}
                  addCats={cats => {
                    this.setState({ displayed: false });
                    this.props.addCats(cats);
                  }}
                />
              </React.Suspense>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchCat;
