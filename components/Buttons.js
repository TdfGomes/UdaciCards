import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


export default class Buttons extends Component {
  onPressPrimaryBtn = (ev) => {
    // this.props.navigation.navigate('Quiz', { deckId: this.props.deckId })
    this.props.onPressPrimary(ev)
  }
  onPressSecondaryBtn = (ev) => {
    this.props.onPressSecondary(ev)
  }
  render(){
    return(
      <View style={this.props.style === null ? styles.buttonsWrapper : this.props.style}>
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
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 5,
  }
})