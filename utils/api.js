import { AsyncStorage } from 'react-native'
import { Permissions, Notifications, Constants } from 'expo'
import { DECKS_STORAGE_KEY, initialDecks } from './_decks'

const LOCAL_NOTIFICATIONS = "UdaciCards:notifications"


/**
 *
 * DECKS HELPERS
 *
 */

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

export const getDeck = (deck) => {
  return getDecks().then((res) => res[deck])
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
  return getDecks().then(({[title]:{questions}}) => {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]:{
        questions: [...questions,{...card}]
      }
    }))
  })
}


/**
 *
 * NOTIFICAITONS HELPERS
 *
 */

function createNotification(){
  return {
    title: "Let's Play",
    body: "Don't forget to play and learning with this game!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function clearNotifiction() {
  return AsyncStorage.removeItem(LOCAL_NOTIFICATIONS)
  .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification(){
  AsyncStorage.getItem(LOCAL_NOTIFICATIONS).then(JSON.parse)
  .then((data) => {
    if(data === null){
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status}) => {
          if(status === 'granted'){
            Notifications.cancelAllScheduledNotificationsAsync();
            
            let time = new Date()
            time.setDate(time.getDate() + 1)
            time.setHours(13)
            time.setMinutes(30)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time,
                repeat:'day'
              }
            )
            AsyncStorage.setItem(LOCAL_NOTIFICATIONS,JSON.stringify(true))
          }
        })
    }
  })
}
