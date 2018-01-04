import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Buttons from './Buttons'
import { DB } from '../utils/db'
import { teal, lightGray } from '../utils/colors';

export default class SingleDeck extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.deckId} Quiz`
  })

  render(){
    return(
      <View>
        <View>
          <Text>QUESTION 1</Text>
        </View>
        <Buttons
          primary={teal}
          secondary={lightGray}
          primaryTitle='Incorrect'
          secondaryTitle='Correct'
        />
      </View>
    )
  }
}
