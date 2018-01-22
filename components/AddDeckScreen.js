import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { teal, white, mainStyles } from '../utils/styles'
import { connect } from 'react-redux'
import { submitDeck, getDeck } from '../utils/api'
import { addDeck } from '../actions'
import { Entypo } from '@expo/vector-icons'

class AddDeck extends Component{
  state = {
    title:'',
  }

  _submit = () => {
    const { title } = this.state
    const { addDeck } = this.props;
    
    if(title.length > 0){
      submitDeck(title)
        .then(() => addDeck(title))
        .then(() => getDeck(title)
            .then(deck =>
              this.props.navigation.navigate("SingleDeck", {
                deckId: deck.title
              })
            )
            .then(() => this.setState({ title: "" }))
        );
    }
  }
  
  render(){
    return <View style={mainStyles.container}>
        <Text style={mainStyles.label}>Add a new deck title</Text>
        <View style={mainStyles.inputContainer}>
          <TextInput style={mainStyles.input} onChangeText={title => this.setState(
                { title }
              )} value={this.state.title} keyboardType="default" autoCapitalize="sentences" returnKeyType="done" placeholder="Deck Title Here" />
        </View>
        <TouchableOpacity onPress={this._submit} style={[styles.submitBtn, { backgroundColor: teal }]}>
          <Text style={{ fontSize: 20, color: white, textAlign: "center" }}>
            Add Deck
          </Text>
        </TouchableOpacity>
      </View>;
  }
}

const styles = StyleSheet.create({
  submitBtn: {
    width: 142,
    paddingVertical: 15,
    marginTop: 35,
    borderRadius: 5
  }
});

const mapStateToProps = (deck) => ({
  deck
})

export default connect(mapStateToProps, { addDeck })(AddDeck);