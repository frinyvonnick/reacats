const defaultState = [
  { url: "https://cdn2.thecatapi.com/images/c0.jpg" },
  { url: "https://cdn2.thecatapi.com/images/c3.jpg" },
  { url: "https://cdn2.thecatapi.com/images/dq.jpg" },
  { url: "https://cdn2.thecatapi.com/images/e8.jpg" },
  { url: "https://cdn2.thecatapi.com/images/f6.jpg" },
  { url: "https://cdn2.thecatapi.com/images/fe.jpg" }
];

export function cats(state = defaultState, action) {
  switch (action.type) {
    case "ADD_CAT":
      return [...state, action.cat];
    case "ADD_CATS":
      return [...state, ...action.cats];
    case "SET_CATS":
      return action.cats;
    case "MOVE_CAT": {
      const copy = [...state];
      const element = copy.splice(action.source, 1)[0];
      copy.splice(action.target, 0, element);
      return copy;
    }
    default:
      return state;
  }
}
