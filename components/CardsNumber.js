import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { teal } from '../utils/styles'

const CardsNumber = (props) => (
  <View style={styles.cardsContainer}>
    <View style={styles.number}><Text style={{ fontWeight: 'bold' }}>{props.cards}</Text></View>
    <Text style={{fontSize:props.fontSize}}>Cards</Text>
  </View>
)

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    borderWidth: 2,
    borderColor: teal,
    borderRadius: 500,
    marginRight: 7,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  }
})

export default CardsNumber