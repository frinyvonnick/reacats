import { connect } from 'react-redux'

import { Cats } from './Cats'

export const CatsContainer = connect(state => ({ cats: state.cats }))(Cats)

