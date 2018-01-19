import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import CardsNumber from './CardsNumber';
import Buttons from './Buttons'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { reciveDecks } from '../actions'
import { teal, lightGray } from '../utils/styles';

class SingleDeck extends Component {
  
  componentDidMount() {
    const { reciveDecks } = this.props;
    getDecks().then(decks => reciveDecks(decks))
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{this.props.navigation.state.params.deckId}</Text>
          <CardsNumber 
            cards={this.props.decks[this.props.navigation.state.params.deckId].questions.length}
            fontSize={20}
          />
        </View>
        <Buttons
          style={null}
          primary={teal}
          secondary={lightGray}
          primaryTitle='Add Cart'
          secondaryTitle='Start Quiz'
          navigation={this.props.navigation}
          onPressPrimary={() => this.props.navigation.navigate('AddCard', { deckId: this.props.navigation.state.params.deckId })}
          onPressSecondary={() => this.props.navigation.navigate('Quiz', { deckId: this.props.navigation.state.params.deckId })}
        />
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
  titleWrapper:{
    flex:0.5,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title:{
    fontWeight:'bold',
    fontSize:35,
    marginTop:7,
    marginBottom:7,
    color:teal
  }  
})

const mapStateToProps = (decks) => ({
  decks,
})
export default connect(mapStateToProps, { reciveDecks })(SingleDeck);