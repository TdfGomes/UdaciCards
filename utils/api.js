import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'

export const getDecks = () => (
 AsyncStorage.getItem(DECKS_STORAGE_KEY)
)

export const submitDeck = (deck) => {
console.log(deck)
 return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck]:{
      title:deck,
      questions: []
    }
  }))
}

