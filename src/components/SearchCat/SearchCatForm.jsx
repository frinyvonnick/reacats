import React, { Component } from "react";
import Select from "react-select";
import "./SearchCatForm.css";
import config from "../../config.json";

const limit = 20;
const apiKey = config.apiKey;
const baseUrl = "https://api.thecatapi.com/v1";

class SearchCatForm extends Component {
  constructor(props) {
    super(props);

    this.searchCat = this.searchCat.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      cats: [],
      allCategories: [],
      selected: [],
      loadingCats: false
    };

    fetch(`${baseUrl}/categories`)
      .then(response => response.json())
      .then(allCategories =>
        allCategories.map(({ name, id }) => ({ value: id, label: name }))
      )
      .then(allCategories => this.setState({ allCategories }));
  }

  searchCat(categories) {
    const ids = categories.map(c => c.value);
    const headers = new Headers();
    headers.append("x-api-key", apiKey);
    this.setState({ loadingCats: true })
    fetch(
      `${baseUrl}/images/search?limit=${limit}&category_ids=${ids.join(",")}`
    )
      .then(response => response.json())
      .then(cats => this.setState({ cats, loadingCats: false }));
  }

  toggle(id) {
    let newState = this.state.selected;
    if (newState.includes(id)) {
      newState = newState.filter(i => id !== i);
    } else {
      newState.push(id);
    }

    this.setState({ selected: newState });
  }

  render() {
    const { cats, allCategories, loadingCats, selected } = this.state;
    return (
      <div className="SearchCatForm">
        <Select isMulti options={allCategories} onChange={this.searchCat} />
        {loadingCats ? (
          <span>Loading cats...</span>
        ) : (
            <div className="SearchCatForm-results">
              {cats.map(cat => (
                <img
                  alt=""
                  src={cat.url}
                  onClick={() => this.toggle(cat.id)}
                  key={cat.id}
                  className={
                    selected.includes(cat.id) ? "SearchCatForm-selected" : ""
                  }
                />
              ))}
            </div>
          )}
        {selected.length > 0 && (
          <button
            className="SearchCatForm-submit"
            onClick={() => {
              const urls = cats
                .filter(cat => selected.includes(cat.id))
                .map(cat => cat.url);
              this.props.addCats(urls);
            }}
          >
            Add Cats
          </button>
        )}
      </div>
    );
  }
}

export default SearchCatForm;
