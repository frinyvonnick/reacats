const defaultState = [
  {
    url:
      "https://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/549585-istock-909106260.jpg"
  },
  {
    url:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
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
