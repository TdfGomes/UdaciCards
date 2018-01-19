import React, { Component } from 'react'
import { 
  View,
  Text,
  TextInput,
  Platform,
  Button,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { teal, lightGray, white, mainStyles } from '../utils/styles'
import { submitCard } from '../utils/api'
import { addCard } from '../actions'
import { connect } from 'react-redux'

class AddCardScreen extends Component {
  state = {
    question:'',
    answer:'',
    bool:false,
    visible:false
  }
  _handleValue = (input) => (value) => {
    this.setState({
      [input]:value
    })
  }

  _submitValues = () => {
    const {navigation:{state:{params:{deckId}}}} = this.props
    const { question, answer, bool } = this.state

    const questions = {
      question,
      answer,
      bool,
    }

    if(question.length > 0 && answer.length > 0){
      this.props.dispatch(addCard(deckId,questions));
      submitCard(deckId,questions)
      this.setState({ visible: true })
    }
  }

  _close = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
      question: "",
      answer: "",
      bool: false
    }),() => {
      this.props.navigation.goBack(null);
    });
    
  };

  render(){
    const { question, answer, bool } = this.state
    return <KeyboardAvoidingView style={mainStyles.container} behavior="padding">
        <View style={styles.form}>
          <View style={{ marginBottom:30}}>
            <Text style={mainStyles.label}>Add a new card question</Text>
            <View style={mainStyles.inputContainer}>
              <TextInput style={mainStyles.input} onChangeText={this._handleValue("question")} value={question} keyboardType="default" autoCapitalize="sentences" returnKeyType="done" placeholder="Question" />
            </View>
          </View>
          <View style={{ marginBottom:30}}>
            <Text style={mainStyles.label}>Add the answer to the question</Text>
            <View style={mainStyles.inputContainer}>
              <TextInput style={mainStyles.input} onChangeText={this._handleValue("answer")} value={answer} keyboardType="default" autoCapitalize="sentences" returnKeyType="done" placeholder="Answer" />
            </View>
          </View>
          <View style={{ marginBottom:30}}>
            <Text style={mainStyles.label}>
              {bool
                .toString()
                .charAt(0)
                .toUpperCase()
                .concat(bool.toString().substr(1))}
            </Text>
            <View style={mainStyles.inputContainer}>
              <Switch onTintColor={teal} onValueChange={bool => this.setState(
                    { bool }
                  )} thumbTintColor={white} tintColor={teal} value={bool} />
            </View>
          </View>
          <View style={{ marginBottom:30, backgroundColor: teal, marginTop: 50 }}>
            <Button onPress={this._submitValues} disabled={question.length > 0 && answer.length > 0 ? false : true} title="Submit" accessibilityLabel="Submit Values" color={lightGray} />
          </View>
        </View>
        <Modal visible={this.state.visible} animationType="fade" onRequestClose={this._close}>
          <View style={mainStyles.container}>
            <TouchableOpacity onPress={this._close} style={mainStyles.button}>
              <Text>Close </Text>
              <Entypo name="cross" size={25} color={teal} />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              You add new card in <Text
                style={{ fontWeight: "700", color: teal }}
              >
                {this.props.navigation.state.params.deckId}
              </Text> deck
            </Text>
          </View>
        </Modal>
      </KeyboardAvoidingView>;
  }
}

export default connect()(AddCardScreen)