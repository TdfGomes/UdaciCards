import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import Buttons from './Buttons'
import { DB } from '../utils/db'
// import { connect } from 'react-redux'
import { teal, lightGray, gray } from '../utils/colors';

const {width, height} = Dimensions.get('window')

class SingleDeck extends Component {
  state={
    currQ:1,
    decks: DB
  }

  _correctAnswer = () => {
    const { navigation: { state: { params: { deckId } } } } = this.props
    const currQuiz = this.state.decks[deckId]
    
    if (this.state.currQ < currQuiz.questions.length){
      this.setState( (prevState) => ({
        currQ: prevState.currQ + 1
      }))
      this.scrollView.scrollTo({ x: width * this.state.currQ }, true)
    }
  }

  render(){
    const {navigation:{state:{params:{deckId}}}} = this.props
    const currQuiz = this.state.decks[deckId]

    return(
      <View style={[styles.container, { flex: 1}]}>
        <View style={styles.questionsCounter}>
          <Text style={styles.questionsNumber}>{`${this.state.currQ}/${currQuiz.questions.length}`}</Text>
        </View>
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }} 
          horizontal
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment={'center'}
          scrollEnabled={false}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
          {
            currQuiz.questions.map( (question, index) => {
              return(
                <View key={index} style={styles.question}>
                  <Text style={styles.questionText}>{question.question}</Text>
                </View>              
              )
            })
          }
        </ScrollView>
        <Buttons
          primary={teal}
          secondary={lightGray}
          primaryTitle='Incorrect'
          secondaryTitle='Correct'
          onPressPrimary={() => console.log('secondary')}
          onPressSecondary={this._correctAnswer}
        /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionsCounter:{
    padding:7,
    position:'absolute',
    top:0,
    left:0
  },
  questionsNumber:{
    fontWeight:'800',
    color:gray,
    fontSize:16
  },
  question:{
    width,
    height: Math.ceil(height / 2),
    marginBottom:35,
    transform:[
      {translateY:Math.ceil(height / 3)}
    ]
  },
  questionText:{
    textAlign:'center',
    fontSize:28
  }
})

export default SingleDeck
