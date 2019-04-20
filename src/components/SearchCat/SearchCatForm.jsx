import React, { useEffect, useReducer } from "react";
import Select from "react-select";
import "./SearchCatForm.css";
import config from "../../config.json";

const imageTypes = ["jpg", "png", "gif"].map(v => ({ value: v, label: v }));
const apiKey = config.apiKey;
const baseUrl = "https://api.thecatapi.com/v1";

const SET_CATEGORIES = "SET_CATEGORIES";
const SELECT_CATEGORY = "SELECT_CATEGORY";
const SELECT_IMAGE_TYPES = "SELECT_IMAGE_TYPES";
const SET_CATS = "SET_CATS";
const SEARCH = "SEARCH";
const TOGGLE = "TOGGLE";

const initialState = {
  cats: [],
  categories: [],
  loading: false,
  selectedCats: [],
  selectedCategory: undefined,
  selectedImageTypes: []
};

function SearchCatForm({ limit, excludedCats, addCats }) {
  function reducer(state, action) {
    switch (action.type) {
      case SET_CATEGORIES:
        return {
          ...state,
          categories: action.categories
        };
      case SEARCH:
        return {
          ...state,
          loading: true
        };
      case SET_CATS:
        return {
          ...state,
          loading: false,
          cats: action.cats
        };
      case TOGGLE:
        if (!excludedCats.includes(action.cat.url)) {
          return {
            ...state,
            selectedCats: toggle(state.selectedCats, action.cat.id)
          };
        }
        return state;
      case SELECT_CATEGORY:
        return {
          ...state,
          selectedCategory: action.category
        };
      case SELECT_IMAGE_TYPES:
        return {
          ...state,
          selectedImageTypes: action.imageTypes
        };
      default:
        return state;
    }
  }

  const [
    {
      cats,
      categories,
      loading,
      selectedCats,
      selectedCategory,
      selectedImageTypes
    },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then(response => response.json())
      .then(categories =>
        categories.map(({ name, id }) => ({ value: id, label: name }))
      )
      .then(categories => dispatch({ type: SET_CATEGORIES, categories }));
  }, []);

  useEffect(() => {
    const imageTypes = selectedImageTypes.map(t => t.value);
    const headers = new Headers();
    headers.append("x-api-key", apiKey);
    dispatch({ type: SEARCH });
    fetch(
      `${baseUrl}/images/search?limit=${limit}&category_ids=${
        selectedCategory ? selectedCategory.value : ""
      }&mime_types=${imageTypes.join(",")}`
    )
      .then(response => response.json())
      .then(cats => dispatch({ type: SET_CATS, cats }));
  }, [limit, selectedCategory, selectedImageTypes]);

  return (
    <div className="SearchCatForm">
      <Select
        options={categories}
        placeholder="Category"
        value={selectedCategory}
        onChange={category => dispatch({ type: SELECT_CATEGORY, category })}
        className="SearchCatForm-select"
      />
      <Select
        isMulti
        options={imageTypes}
        placeholder="Image type"
        value={selectedImageTypes}
        onChange={imageTypes =>
          dispatch({ type: SELECT_IMAGE_TYPES, imageTypes })
        }
        className="SearchCatForm-select"
      />
      {loading ? (
        <span>Loading cats...</span>
      ) : (
        <div className="SearchCatForm-results">
          {cats.map(cat => (
            <img
              alt=""
              src={cat.url}
              onClick={() => dispatch({ type: TOGGLE, cat })}
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
            addCats(urls);
          }}
        >
          Add Cats
        </button>
      )}
    </div>
  );
}

function toggle(array, value) {
  return array.includes(value)
    ? array.filter(v => v !== value)
    : [...array, value];
}

export default SearchCatForm;
