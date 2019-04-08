import React, {Fragment, useState} from 'react';
import './SearchCat.css';
import './SearchCatForm';
import SearchCatForm from './SearchCatForm';

function SearchCat(props) {
  const [displayed, setDisplayed] = useState(false);
  const toggleForm = () => setDisplayed(!displayed);

  return (
    <Fragment>
      <button className="SearchCat-button" onClick={toggleForm}>
        Search cat
      </button>
      {displayed && (
        <div className="SearchCat-overlay" onClick={toggleForm}>
          <div className="SearchCat-content" onClick={e => e.stopPropagation()}>
            <SearchCatForm
              limit={100}
              excludedCats={props.excludedCats}
              addCats={cats => {
                setDisplayed(false);
                props.addCats(cats);
              }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default SearchCat;
