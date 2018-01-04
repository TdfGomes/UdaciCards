import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { teal } from '../utils/colors'

const CardsNumber = (props) => (
  <View style={styles.cardsContainer}>
    <View style={styles.number}><Text style={{ fontWeight: 'bold' }}>{props.cards}</Text></View>
    <Text>Cards</Text>
  </View>
)

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
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