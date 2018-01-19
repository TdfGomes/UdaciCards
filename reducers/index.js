import * as actionTypes from "../actions/actionTypes";

const decks = (state = {}, action) => {
  switch(action.type){
    case actionTypes.RECIVE_DECKS:
      return action.decks
    case actionTypes.ADD_DECK:
      return{
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
    case actionTypes.ADD_CARD:
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