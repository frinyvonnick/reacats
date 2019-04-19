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
      <>
        <button className="SearchCat-button" onClick={this.toggleForm}>
          Search cat
        </button>
        {this.state.displayed && (
          <div className="SearchCat-overlay" onClick={this.toggleForm}>
            <div
              className="SearchCat-content"
              onClick={e => e.stopPropagation()}
            >
              <LazyErrorBoundary>
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
              </LazyErrorBoundary>
            </div>
          </div>
        )}
      </>
    );
  }
}

class LazyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
  }
  componentDidCatch(error) {
    this.setState({ error: error.message });
  }

  render() {
    const error = this.state.error;
    return error ? <span>{error}</span> : this.props.children;
  }
}

export default SearchCat;
