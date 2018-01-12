import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export const initialDecks = {
  React: {
    title: "React", 
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
        bool:true 
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
        bool:true 
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer: "The combination of a function and the lexical environment within which that function was declared." ,
        bool:true
      }
    ]
  }
};

