import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, initialDecks } from './_decks'

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => {
      if(res === null){
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialDecks))
        return initialDecks
      }     
      return JSON.parse(res)
    })
}

export function submitDeck(title){
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function submitCard(title,card){

  getDecks().then(({[title]:{questions}}) => {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]:{
        questions: [...questions,{...card}]
      }
    }))
  })
}

