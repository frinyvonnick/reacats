import React, { Component } from "react";
import Select from "react-select";
import { unstable_createResource } from "react-cache";
import "./SearchCatForm.css";
import config from "../../config.json";

const limit = 100;
const imageTypes = ["jpg", "png", "gif"].map(v => ({ value: v, label: v }));
const apiKey = config.apiKey;
const baseUrl = "https://api.thecatapi.com/v1";

const catResource = unstable_createResource((category, imageTypes) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${baseUrl}/images/search?limit=${limit}&category_ids=${
        category ? category.value : ""
      }&mime_types=${imageTypes.join(",")}`
    ).then(response => response.json());
  });
});

class SearchCatForm extends Component {
  constructor(props) {
    super(props);

    this.searchCat = this.searchCat.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      cats: [],
      allCategories: [],
      loadingCats: false,
      selectedCats: [],
      selectedCategory: null,
      selectedImageTypes: [],
      allImageTypes: imageTypes
    };

    fetch(`${baseUrl}/categories`)
      .then(response => response.json())
      .then(allCategories =>
        allCategories.map(({ name, id }) => ({ value: id, label: name }))
      )
      .then(allCategories => this.setState({ allCategories }));

    fetch(`${baseUrl}/breeds`)
      .then(response => response.json())
      .then(allBreeds =>
        allBreeds.map(({ name, id }) => ({ value: id, label: name }))
      )
      .then(allBreeds => this.setState({ allBreeds }));
  }

  componentDidMount() {
    this.searchCat();
  }

  searchCat() {
    const { selectedImageTypes, selectedCategory } = this.state;
    const imageTypes = selectedImageTypes.map(t => t.value);
    const headers = new Headers();
    headers.append("x-api-key", apiKey);
    this.setState({ loadingCats: true });
    fetch(
      `${baseUrl}/images/search?limit=${limit}&category_ids=${
        selectedCategory ? selectedCategory.value : ""
      }&mime_types=${imageTypes.join(",")}`
    )
      .then(response => response.json())
      .then(cats => this.setState({ cats, loadingCats: false }));
  }

  toggle(id) {
    let newState = this.state.selectedCats;
    if (newState.includes(id)) {
      newState = newState.filter(i => id !== i);
    } else {
      newState.push(id);
    }

    this.setState({ selectedCats: newState });
  }

  render() {
    const {
      cats,
      allCategories,
      loadingCats,
      selectedCats,
      allImageTypes
    } = this.state;

    const { excludedCats } = this.props;

    return (
      <div className="SearchCatForm">
        <Select
          options={allCategories}
          placeholder="Category"
          onChange={selectedCategory =>
            this.setState({ selectedCategory }, this.searchCat)
          }
          className="SearchCatForm-select"
        />
        <Select
          isMulti
          options={allImageTypes}
          placeholder="Image type"
          onChange={selectedImageTypes =>
            this.setState({ selectedImageTypes }, this.searchCat)
          }
          className="SearchCatForm-select"
        />
        {loadingCats ? (
          <span>Loading cats...</span>
        ) : (
          <div className="SearchCatForm-results">
            {cats.map(cat => (
              <img
                alt=""
                src={cat.url}
                onClick={() =>
                  !excludedCats.includes(cat.url) && this.toggle(cat.id)
                }
                key={cat.id}
                className={`${
                  selectedCats.includes(cat.id) ? "SearchCatForm-selected" : ""
                }${
                  excludedCats.includes(cat.url) ? "SearchCatForm-excluded" : ""
                }`}
              />
            ))}
          </div>
        )}
        {selectedCats.length > 0 && (
          <button
            className="SearchCatForm-submit"
            onClick={() => {
              const urls = cats
                .filter(cat => selectedCats.includes(cat.id))
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
