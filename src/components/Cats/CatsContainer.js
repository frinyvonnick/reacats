import React, { useContext } from "react";
import Cats from "./Cats";

import CatContext from "../../CatContext";

export function CatsContainer(props) {
  const { dispatch, cats } = useContext(CatContext);

  return (
    <Cats
      cats={cats}
      moveCat={(source, target) =>
        dispatch({ type: "MOVE_CAT", source, target })
      }
      readCats={cats => dispatch({ type: "SET_CATS", cats })}
      {...props}
    />
  );
}
