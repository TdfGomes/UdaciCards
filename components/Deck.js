import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { teal, gray, white, lightGray } from '../utils/colors';
import CardsNumber from './CardsNumber';

const Deck = (props) => (
  <TouchableOpacity onPress={() => props.navigation.navigate('SingleDeck',{deckId:props.title})}>
    <View style={styles.deck}>
      <Text style={styles.title}>{props.title}</Text>
      <CardsNumber cards={props.cards}/>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  deck: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:2,
    margin:25,
    padding:45,
    backgroundColor:white,
    shadowColor: 'rgba(80, 80, 80, 0.34)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    borderWidth:0.5,
    borderColor:'#E0E0E0'
  },
  title:{
    color:teal,
    fontWeight:'300',
    fontSize:20,
    marginBottom:10
  }
})

export default Deck