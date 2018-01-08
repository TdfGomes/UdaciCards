export const RECIVE_DECKS = 'RECIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const reciveDecks = (decks) => ({
  type:RECIVE_DECKS,
  decks
})

export const addDeck = (deck) => ({
  type:ADD_DECK,
  deck
})

export const addCard = (card) => ({
  type:ADD_CARD,
  card
})