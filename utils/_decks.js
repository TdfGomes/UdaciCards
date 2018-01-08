import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'The componentDidMount is a React lifecycle event?',
        answer: 'yes'
      },
      {
        question: 'Can you make Ajax requests in React?',
        answer: 'yes'
      },
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'Javascript is NOT a OOP language?',
        answer: 'no'
      }
    ]
  }
}

// try {
//   await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialDecks));
// } catch (error) {
//   throw new Error(error)
// }