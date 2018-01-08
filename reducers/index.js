import { ADD_DECK, ADD_CARD } from '../actions'

const decks = (state = {}, action) => {
  switch(action.type){
    case ADD_DECK:
      return state
    case ADD_CARD:
      return state
    default: 
      return state
  }
}

export default decks