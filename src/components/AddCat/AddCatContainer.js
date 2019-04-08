import React, {useContext} from 'react';
import {AddCat} from './AddCat';

import CatContext from '../../CatContext';

export function AddCatContainer(props) {
  const {addCat} = useContext(CatContext);
  return <AddCat addCat={url => addCat({url})} {...props} />;
}
