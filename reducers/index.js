import { ADD_DECK, ADD_CARD, RECIVE_DECKS } from '../actions'

const decks = (state = {}, action) => {
  switch(action.type){
    case RECIVE_DECKS:
      return action.decks
    case ADD_DECK:
      return{
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
    case ADD_CARD:
      const questions = state[action.deck].questions.concat(action.card);
      
      return {
        ...state,
        [action.deck]:{
          questions,
        }
      }
      
    default: 
      return state
  }
}

export default decks