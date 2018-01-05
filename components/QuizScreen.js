import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import Buttons from './Buttons'
import { DB } from '../utils/db'
import { teal, lightGray, gray } from '../utils/colors';

const {width, height} = Dimensions.get('window')

export default class SingleDeck extends Component {
  state={
    currentQuestion:1
  }

  static navigationOptions = ({ navigation }) => ({
     title: `${navigation.state.params.deckId.title} Questions`,
     headerBackTitle: 'Back',
  })

  render(){
    const {navigation:{state:{params:{deckId}}}} = this.props
    
    return(
      <View style={[styles.container, { flex: 1}]}>
        <View style={styles.questionsCounter}>
          <Text style={styles.questionsNumber}>{`${this.state.currentQuestion}/${deckId.questions.length}`}</Text>
        </View>
        <ScrollView 
          pagingEnabled={true}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
          {
            deckId.questions.map( (question, index) => {
              return(
                <View key={index} style={styles.question}>
                  <Text style={{textAlign:'center'}}>{question.question}</Text>
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
    position:'absolute',
    // top: Math.ceil(height / 2),
    transform:[
      {translateY:Math.ceil(height / 2) * -1}
    ]
  }
})
