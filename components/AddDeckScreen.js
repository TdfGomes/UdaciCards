import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const AddDeck = () => (
  <View style={styles.container}>
    <Text>Add Deck</Text>
  </View>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default AddDeck