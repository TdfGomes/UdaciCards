import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { teal, gray } from '../utils/colors';

const Deck = (props) => (
  <View style={styles.deck}>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.cards}>{props.cards}</Text>
  </View>
)

const styles = StyleSheet.create({
  deck: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    color:teal,
    fontWeight:'300',
    fontSize:20
  },
  cards:{
    color:gray,
    fontSize:15
  }
})

export default Deck