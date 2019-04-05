import { useState } from "react";

export default function useLocalStorage(name, initialValue) {
  const [state, setState] = useState(initialValue);
  const current = localStorage.getItem(name);
  if (current === null) {
    current.setItem(name, JSON.stringify(initialValue));
  } else if (current !== JSON.stringify(state)) {
    setState(JSON.parse(current));
  }

  return [
    state,
    newValue => {
      localStorage.setItem(name, JSON.stringify(newValue));
      setState(newValue);
    }
  ];
}
