import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


export default class Buttons extends Component {
  onPressPrimaryBtn = (i) => {
    // this.props.navigation.navigate('Quiz', { deckId: this.props.deckId })
    this.props.onPressPrimary()
  }
  onPressSecondaryBtn = () => {
    this.props.onPressSecondary()
  }
  render(){
    return(
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity onPress={this.onPressPrimaryBtn} style={[styles.button, { borderColor: this.props.primary, borderWidth: 1.3 }]}>
          <Text style={{ fontSize: 20, color: this.props.primary, textAlign: 'center' }}>{this.props.primaryTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressSecondaryBtn} style={[styles.button, { backgroundColor: this.props.primary }]}>
          <Text style={{ fontSize: 20, color: this.props.secondary, textAlign: 'center' }}>{this.props.secondaryTitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonsWrapper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom:50
  },
  button: {
    width: 142,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    borderRadius: 5,
  }
})