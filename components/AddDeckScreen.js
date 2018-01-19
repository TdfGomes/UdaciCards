import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Platform, Modal, TouchableOpacity } from 'react-native'
import { teal, white, mainStyles } from '../utils/styles'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'
import { Entypo } from '@expo/vector-icons'

class AddDeck extends Component{
  state = {
    title:'',
    visible:false
  }

  _submit = () => {
    const { title } = this.state
    const { addDeck } = this.props;
    
    if(title.length > 0){
      submitDeck(title)
      addDeck(title)
      this.setState({visible:true})
    }  
  }
  _close = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
      title: ""
    }),() => {
      this.props.navigation.goBack(null);
    });
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
        <Modal visible={this.state.visible} animationType="fade" onRequestClose={this._close}>
          <View style={mainStyles.container}>
            <TouchableOpacity onPress={this._close} style={mainStyles.button}>
              <Text>Close </Text>
              <Entypo name="cross" size={25} color={teal} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              You add <Text style={{ fontWeight: "700", color: teal }}>
                {this.state.title}
              </Text> to your Deck List
            </Text>
          </View>
        </Modal>
      </View>;
  }
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 20
  },
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