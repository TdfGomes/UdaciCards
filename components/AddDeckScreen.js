import React, { Component } from 'react'
import { View, Text, TextInput,StyleSheet, Platform, Modal } from 'react-native'
import { teal } from '../utils/colors'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'

class AddDeck extends Component{
  state = {
    title:'',
    visible:false
  }

  _submit = () => {
    const { title } = this.state
    const { dispatch } = this.props
    
    submitDeck(title)
    dispatch(addDeck(title))
    this.setState({visible:true})
    
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.label}>Add a new card deck here</Text>
        <View style={styles.inpuContainer}>
          <TextInput 
            style={styles.input}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='done'
            placeholder='Deck Title Here'
            onSubmitEditing={this._submit}
            />
        </View>
        <Modal
          visible={this.state.visible}
          animationType='fade'
          onRequestClose={()=>console.log('CLOSE')}
          >
          <View style={styles.container}>
            <Text style={styles.modalText}>
              You add <Text style={{fontWeight:'700',color:teal}}>{this.state.title}</Text> to your Deck List
            </Text>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label:{
    paddingHorizontal:35,
    marginBottom:10,
    fontSize:25,
    alignSelf:'flex-start'
  },
  inpuContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  input:{
    flex:0.8,
    height:40,
    borderWidth: Platform.OS === 'ios' ? 1 : null,
    borderColor:teal,
    borderRadius:Platform.OS === 'ios' ? 2 : null,
    paddingVertical:5,
    paddingHorizontal:15
  },
  modalText:{
    fontSize:20
  }
})

const mapStateToProps = (deck) => ({
  deck
})

export default connect(mapStateToProps)(AddDeck)