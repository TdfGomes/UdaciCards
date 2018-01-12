/**
 * FLIP ANIMATION INSPIRED @ https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.ios.js
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native'
import Buttons from './Buttons'
import { teal, lightGray, gray, white } from '../utils/colors';
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { reciveDecks } from '../actions'

const {width, height} = Dimensions.get('window')

class QuizScreen extends Component {
  state = {
    currQ: 1,
    _fadeIN : new Animated.Value(0),
    _fadeOUT : new Animated.Value(1),
    toValueIn:1,
    toValueOut:0
  };

  componentWillMount() {
    /*Filp Animation*/
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
    // /* Fade Animations */
    // this._fadeIN = new Animated.Value(0);
    // this._fadeOUT = new Animated.Value(1);
    this.state._fadeIN.addListener(({ value }) => {
      this.state.toValueIn = value;
    });
    this.state._fadeOUT.addListener(({ value }) => {
      this.state.toValueOut = value;
    });
    
  }

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(reciveDecks(decks)));
  }

  _correctAnswer = () => {
    const { navigation: { state: { params: { deckId } } } } = this.props;
    const currQuiz = this.props.decks[deckId];

    if (this.state.currQ < currQuiz.questions.length) {
      this.setState(prevState => ({
        currQ: prevState.currQ + 1,
      }));
      this.scrollView.scrollTo({ x: width * this.state.currQ }, true);
      console.log('OUT',this.state.toValueOut)
      console.log('IN',this.state.toValueIn)
    }
  };

  _flipCard = () => {
    Animated.timing(this.state._fadeIN, { toValue: this.state.toValueIn, duration: 300 }).start();
    Animated.timing(this.state._fadeOUT, { toValue: this.state.toValueOut, duration: 300 }).start();
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }
  

  render() {
    const { navigation: { state: { params: { deckId } } } } = this.props;
    const currQuiz = this.props.decks[deckId];

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    const visible = this.state._fadeIN
    const hidden = this.state._fadeOUT

    return (
      <View style={[styles.container, { flex: 1 }]}>
        <View style={styles.questionsCounter}>
          <Text style={styles.questionsNumber}>{`${this.state.currQ}/${
            currQuiz.questions.length
          }`}</Text>
        </View>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          horizontal
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment={"center"}
          scrollEnabled={false}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30
          }}
        >
          {currQuiz.questions.map((question, index) => {
            return <View key={index} style={[styles.container, { flex: 1 }]}>
                <View>
                  <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                    <Text style={styles.questionText}>
                      {question.question}
                    </Text>
                  </Animated.View>
                  <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                    <Text style={styles.questionText}>
                      {question.answer}
                    </Text>
                  </Animated.View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Animated.View style={{opacity:this.state.reverseAnim ? visible : hidden}}>
                    <TouchableOpacity onPress={() => this._flipCard()}>
                      <Text style={{marginBottom:5, fontWeight:'700', fontSize:16}}>Answer!</Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View style={{opacity:this.state.reverseAnim ? hidden : visible}}>
                    <Buttons style={styles.container} primary={teal} secondary={lightGray} primaryTitle="Incorrect" secondaryTitle="Correct" onPressPrimary={() => console.log("secondary")} onPressSecondary={this._correctAnswer} />
                  </Animated.View>
                </View>
              </View>;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  questionsCounter: {
    padding: 7,
    position: "absolute",
    top: 0,
    left: 0
  },
  questionsNumber: {
    fontWeight: "800",
    color: gray,
    fontSize: 16
  },

  flipCard: {
    width,
    height: Math.ceil(height / 2),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: white,
    backfaceVisibility: "hidden"
  },
  flipCardBack: {
    backgroundColor: white,
    position: "absolute",
    top: 0
  },
  questionText: {
    textAlign: "center",
    fontSize: 22,
    paddingHorizontal:20
  }
});

const mapStateToProps = (decks) => ({
  decks,
})
export default connect(mapStateToProps)(QuizScreen)
