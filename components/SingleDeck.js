import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import CardsNumber from './CardsNumber';
import { DB } from '../utils/db'
import { teal, lightGray } from '../utils/colors';

export default class SingleDeck extends Component {
  state = {
    decks: DB
  }
  
  static navigationOptions = ({ navigation }) =>({
    title:`${navigation.state.params.deckId}`
  })

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{this.props.navigation.state.params.deckId}</Text>
          <CardsNumber 
            cards={this.state.decks[this.props.navigation.state.params.deckId].questions.length}
            fontSize={20}
            />
        </View>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={[styles.button, {borderColor:teal,borderWidth:1.3}]}>
            <Text style={{fontSize:20, color:teal, textAlign:'center'}}>Add Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: teal}]}>
            <Text style={{ fontSize: 20, color: lightGray, textAlign:'center'}}>Start Quiz</Text>
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
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom:7,
    color:teal
  },
  buttonsWrapper:{
    flex:0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    width:142,
    paddingTop:15,
    paddingBottom:15,
    marginBottom:15,
    borderRadius:5,
  }
  
})