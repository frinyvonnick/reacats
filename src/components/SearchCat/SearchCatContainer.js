import React, {useContext} from 'react';
import SearchCat from './SearchCat';
import CatContext from '../../CatContext';

function SearchCatContainer(props) {
  const {cats, addCats} = useContext(CatContext);
  return (
    <SearchCat
      excludedCats={cats.map(c => c.url)}
      addCats={urls => addCats(urls.map(url => ({url})))}
      {...props}
    />
  );
}

export default SearchCatContainer;
