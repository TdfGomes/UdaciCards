import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'

export const getDecks = () => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    if(decks !== null){
      console.log(decks)
    }
  } catch (error) {
    throw new Error(error)
  }
}