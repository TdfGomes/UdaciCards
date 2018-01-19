import * as actionTypes from './actionTypes'

export const reciveDecks = (decks) => ({
  type:actionTypes.RECIVE_DECKS,
  decks
})

export const addDeck = (deck) => ({
  type:actionTypes.ADD_DECK,
  deck
})

export const addCard = (deck,card) => ({
  type:actionTypes.ADD_CARD,
  deck,
  card
})