import { combineReducers } from 'redux'
import deckReducer from './DeckReducer'

const rootReducer = combineReducers({
    deck: deckReducer
});

export default rootReducer