import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { DB } from '../utils/db'
import Deck from './Deck'

export default class DeckList extends Component{
  state = {
    decks: DB
  }
  _renderDeck = (deck) => {
    const { item } = deck
    
    return(
      <Deck
        title={this.state.decks[item].title}
        cards={this.state.decks[item].questions.length}
      />
    )
  }
  render(){
    return(
      <FlatList 
        data={Object.keys(this.state.decks)}
        renderItem={ this._renderDeck }
        keyExtractor={ (item, index) => index}
      />
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

