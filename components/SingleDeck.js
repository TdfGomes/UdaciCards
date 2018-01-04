import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import CardsNumber from './CardsNumber';
import { DB } from '../utils/db'

export default class SingleDeck extends Component {
  static navigationOptions = ({ navigation }) =>{
    title:`${navigation.state.params.deckId}`
  }
  state = {
    decks: DB
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text>{this.props.navigation.state.params.deckId}</Text>
          <CardsNumber cards={this.state.decks[this.props.navigation.state.params.deckId].questions.length}/>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Add Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  titleWrapper:{
    flex:0.7
  }
})