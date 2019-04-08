import React, {useContext} from 'react';
import Cats from './Cats';

import CatContext from '../../CatContext';

export function CatsContainer(props) {
  const {cats, moveCat, setCats} = useContext(CatContext);
  return (
    <Cats
      cats={cats}
      moveCat={moveCat}
      readCats={setCats}
      {...props}
    />
  );
}
