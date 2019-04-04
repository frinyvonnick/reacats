import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./SearchCatForm.css";
import config from "../../config.json";

const limit = 100;
const imageTypes = ["jpg", "png", "gif"].map(v => ({ value: v, label: v }));
const apiKey = config.apiKey;
const baseUrl = "https://api.thecatapi.com/v1";

function SearchCatForm({ excludedCats, addCats }) {
  const [cats, setCats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedImageTypes, setSelectedTimageTypes] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then(response => response.json())
      .then(allCategories =>
        allCategories.map(({ name, id }) => ({ value: id, label: name }))
      )
      .then(setCategories);
  }, [setCategories]);

  useEffect(() => {
    // FIXME store values ?
    const imageTypes = selectedImageTypes.map(t => t.value);
    const headers = new Headers();
    headers.append("x-api-key", apiKey);
    setLoading(true);
    fetch(
      `${baseUrl}/images/search?limit=${limit}&category_ids=${
        selectedCategory ? selectedCategory.value : ""
      }&mime_types=${imageTypes.join(",")}`
    )
      .then(response => response.json())
      .then(cats => {
        setCats(cats);
        setLoading(false);
      });
  }, [setLoading, setCats, selectedCategory, selectedImageTypes]);

  return (
    <div className="SearchCatForm">
      <Select
        options={categories}
        placeholder="Category"
        value={selectedCategory}
        onChange={v => setSelectedCategory(v)}
        className="SearchCatForm-select"
      />
      <Select
        isMulti
        options={imageTypes}
        placeholder="Image type"
        value={selectedImageTypes}
        onChange={t => setSelectedTimageTypes(t)}
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
              onClick={() =>
                !excludedCats.includes(cat.url) &&
                setSelectedCats(toggle(selectedCats, cat.id))
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
