import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { teal, gray, white, lightGray } from '../utils/colors';

const Deck = (props) => (
  <View style={styles.deck}>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.cards}>
      <Text style={styles.number}>{props.cards}</Text>
      <Text>Cards</Text>
    </Text>
  </View>
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
  },
  cards:{
    color:gray,
    fontSize:15
  },
  number:{
    borderRadius:5,
    borderWidth:0.5,
    // borderStyle:'solid',
    borderColor:teal,
    padding:5,
    marginRight:3
  }
})

export default Deck