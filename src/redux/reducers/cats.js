export function cats(state = [], action) {
  switch (action.type) {
    case 'ADD_CAT':
      return [...state, action.cat]
    case 'ADD_CATS':
      return [...state, ...action.cats]
    default:
      return state
  }
}
