import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const QuizScreen = () => (
  <View style={styles.container}>
    <Text>QUIZ</Text>
  </View>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default QuizScreen