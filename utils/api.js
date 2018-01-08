import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}