export function cats(state = [], action) {
  switch (action.type) {
    case 'ADD_CAT':
      return [...state, action.cat]
    default:
      return state
  }
}
