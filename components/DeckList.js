import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import Deck from './Deck'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { reciveDecks } from '../actions'
import { AppLoading } from 'expo'
import { DECKS_STORAGE_KEY } from '../utils/_decks'

class DeckList extends Component{
  state = {
    loaded:true,
    decks:{}
  }

  componentDidMount() {
    const { dispatch } = this.props
    // getDecks()
    // .then(r => dispatch(reciveDecks(JSON.parse(r))))
    // .then(() => this.setState(() => ({loaded:true})))
    getDecks()
    .then(r => console.log(r))

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
      // <FlatList 
      //   data={Object.keys(this.props.decks)}
      //   renderItem={ this._renderDeck }
      //   keyExtractor={ (item, index) => index}
      // />
      <View>HEELOO WORKS</View>
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

