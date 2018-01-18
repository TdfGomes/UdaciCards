import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import Deck from './Deck'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { reciveDecks } from '../actions'
import { AppLoading, Permissions, Constants, Notifications } from 'expo'

const localNotification = {
  title: "Testing Local Notifications",
  body: "It might be better to mention that Permissions need to be enabled for it to work in iOS. I had to add the below to make it work", // (string) — body text of the notification.
  ios: {
    // (optional) (object) — notification configuration specific to iOS.
    sound: true // (optional) (boolean) — if true, play a sound. Default: false.
  },
  // (optional) (object) — notification configuration specific to Android.
  android: {
    sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
    //icon (optional) (string) — URL of icon to display in notification drawer.
    //color (optional) (string) — color of the notification icon in notification drawer.
    priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
    sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
    vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
    // link (optional) (string) — external link to open when notification is selected.
  }
};

let t = new Date();
t.setSeconds(t.getSeconds() + 10);
const schedulingOptions = {
  time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
  repeat: 'day'
};

class DeckList extends Component{
  state = {
    loaded:true,
  }

  async componentWillMount() {
    const { dispatch } = this.props
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // console.log(Constants)
    // console.log(result)
    
    if (Constants.isDevice && result.status === "granted") {
      Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
    }

    getDecks()
    .then(decks => dispatch( reciveDecks(decks) ))
    .then(() => this.setState(() => ({loaded:true})))
    
    getDecks().then(r => console.log(r))
    
  }
  
  _renderDeck = ({item}) => {
    
    const { decks } = this.props

    return(
      <Deck
        title={decks[item].title}
        cards={decks[item].questions.length}
        onPress={() => this.props.navigation.navigate('SingleDeck', { deckId: decks[item].title })}
      />
    )
  }
  render(){
    const {loaded} = this.state

    if (loaded === false) {
      return <AppLoading />
    }

    return(
      <FlatList 
        data={Object.keys(this.props.decks)}
        renderItem={ this._renderDeck }
        keyExtractor={ (item, index) => index}
      />
      // <Text>HEELOO WORKS</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
})

const mapToStateProps = (decks) => ({
  decks,
})

export default connect(mapToStateProps)(DeckList)

