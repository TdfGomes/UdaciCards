import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, Button, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { teal, lightGray } from '../utils/colors'
import { submitCard } from '../utils/api'

const { width } = Dimensions.get('window')

class AddCardScreen extends Component {
  state = {
    question:'',
    answer:'',
    visible:false
  }
  _handleValue = (input) => (value) => {
    this.setState({
      [input]:value
    })
  }

  _submitValues = () => {
    const {navigation:{state:{params:{deckId}}}} = this.props
    const { question, answer } = this.state
    const questions = [{
      question,
      answer
    }]
    
    submitCard(deckId,questions)
  }

  render(){
    const { question, answer } = this.state
    return(
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Add a new card question</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={this._handleValue('question')}
                value={question}
                keyboardType='default'
                autoCapitalize='sentences'
                returnKeyType='done'
                placeholder='Question'
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Add the answer to the question</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={this._handleValue('answer')}
                value={answer}
                keyboardType='default'
                autoCapitalize='sentences'
                returnKeyType='done'
                placeholder='Answer'
              />
            </View>
          </View>
          <View style={[styles.inputWrapper, {backgroundColor:teal, marginHorizontal:50}]}>
           <Button 
            onPress={this._submitValues}
            disabled={(question.length > 0 && answer.length > 0) ? false : true}
            title='Submit'
            accessibilityLabel='Submit Values'
            color={lightGray}
           />
          </View>
        </View>
        <Modal visible={this.state.visible} animationType='fade'>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => this.setState((prevState) => ({
                  visible: !prevState.visible,
                  question: '',
                  answer: ''
                })
              )}
              style={styles.button}
            >
              <Text>Close </Text><Entypo name="cross" size={25} color={teal} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              You add new card in <Text style={{ fontWeight: '700', color: teal }}>{this.props.navigation.state.params.deckId}</Text> deck 
            </Text>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  inputWrapper:{
    marginBottom:30
  },
  label: {
    paddingHorizontal: 35,
    marginBottom: 10,
    fontSize: 18,
    textAlign:'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  input: {
    flex: 0.9,
    height: 40,
    borderWidth: Platform.OS === 'ios' ? 1 : null,
    borderColor: teal,
    borderRadius: Platform.OS === 'ios' ? 2 : null,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  button: {
    position: 'absolute',
    top: 45,
    left: Math.ceil(width - 90),
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default AddCardScreen