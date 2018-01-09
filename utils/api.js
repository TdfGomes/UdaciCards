import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'

export const getDecks = () => {

 if(!AsyncStorage.getItem(DECKS_STORAGE_KEY)){
  console.log('NO DATA')
 }
 else{
   console.log('DATA')
 }
}

// export const submitDeck = (deckName) => {
  
//   return getDecks().then(JSON.parse)
//     .then(res => {
//       const newDeck = {
//         [deckName]:{
//           title:deckName,
//           questions:[]
//         }
//       }
//       return Object.assign(res,newDeck)
//     })
//     .then(newData => {
//       return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
//         // .then( () => AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(newData)) )
//     })

// }

export function submitDeck(title){
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

