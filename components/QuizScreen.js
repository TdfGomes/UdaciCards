/**
 * FLIP ANIMATION INSPIRED @ https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.ios.js
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, Modal, Platform } from 'react-native'
import Buttons from './Buttons'
import { teal, lightGray, gray, white } from '../utils/colors';
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { reciveDecks } from '../actions'

const {width, height} = Dimensions.get('window')

class QuizScreen extends Component {
  state = {
    currQ: 1,
    endDeck: false,
    score:0,
    _fadeIN: new Animated.Value(0),
    _fadeOUT: new Animated.Value(1),
    hideBtn: false,
    visible:false
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

    /* Fade Animations */
    this.state._fadeIN.addListener(({ value }) => {
      this._value = value;
    });

    this.state._fadeOUT.addListener(({ value }) => {
      this._value = value;
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(reciveDecks(decks)));
    
  }

  _gotoNextCard = () => {
    const { navigation: { state: { params: { deckId } } } } = this.props;
    const currQuiz = this.props.decks[deckId];

    if (this.state.currQ < currQuiz.questions.length) {
      this.setState(prevState => ({
        currQ: prevState.currQ + 1,
        hideBtn: false
      }));
      this.scrollView.scrollTo({ x: width * this.state.currQ }, true);

      this._restartAnimation();
    } else {
      this._endDeck();
    }
  }
  _correctAnswer = (currAnswer) => (ev) => {
    
    if( currAnswer ){
      this.setState(prevState => ({
          score: prevState.score + 1
        }),
        () => this._gotoNextCard()
      );
    }
    else {
      this._gotoNextCard();
    }
  };

  _incorrectAnswer = (currAnswer) => (ev) => {
    
    if( ! currAnswer ){
      this.setState(prevState => ({
          score: prevState.score + 1
        }),
        () => this._gotoNextCard()
      );
    }
    else {
      this._gotoNextCard();
    }
  };

  _endDeck = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
      endDeck: !prevState.endDeck
    }))
  }

  _restartAnimation = () => {
    this.state._fadeIN.setValue(0);
    this.state._fadeOUT.setValue(1);
  };

  _flipCard = () => {

    Animated.sequence([
      Animated.timing(this.state._fadeIN, {
        toValue: 1,
        duration: 300
      }),
      Animated.timing(this.state._fadeOUT, {
        toValue: 0,
        duration: 300
      })
    ]).start()

    this.setState({ hideBtn: true });
    if(Platform.OS === 'ios'){
      if (this.value >= 90) {
        Animated.spring(this.animatedValue, {
          toValue: 0,
          friction: 8,
          tension: 10
        }).start();
      }
      else{
        Animated.spring(this.animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 10
        }).start();
      }
    }
  };
  _goHome = () => {
     this._close()
     this.props.navigation.navigate('Home')
  }
  _resetDeck = () => {

    this._close()
    this._restartAnimation()

    this.setState({
      currQ: 1,
      endDeck: false,
      score:0,
      hideBtn:false
    })

  }
  _close = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible
    }))
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

    const visible = this.state._fadeIN;
    const hidden = this.state._fadeOUT;

    return <View style={[styles.container, { flex: 1 }]}>
        <View style={styles.questionsCounter}>
          <Text style={styles.questionsNumber}>{`${this.state.currQ}/${currQuiz.questions.length}`}</Text>
        </View>
        <ScrollView ref={scrollView => {
            this.scrollView = scrollView;
          }} horizontal decelerationRate={0} snapToInterval={width} snapToAlignment={"center"} scrollEnabled={false} onMomentumScrollEnd={this._handleOnscroll} contentInset={{ top: 0, left: 30, bottom: 0, right: 30 }}>
          {currQuiz.questions.map((question, index) => {
            return <View key={index} style={[styles.container, { flex: 1 }]}>
                <View style={{position:'relative'}}>
                  <Animated.View style={Platform.OS === 'ios' ? [styles.flipCard, frontAnimatedStyle] : [styles.flipCardAndroid, {opacity: hidden}]}>
                    <View style={styles.innerCard}>
                      <Text style={styles.questionText}>
                        {question.question}
                      </Text>
                    </View>
                  </Animated.View>
                  <Animated.View style={Platform === 'ios' ? [backAnimatedStyle, styles.flipCard, styles.flipCardBack] : [styles.flipCardAndroid, styles.flipCardBack, {opacity: visible}]}>
                    <View style={styles.innerCard}>
                      <Text style={styles.questionText}>
                        {question.answer}
                      </Text>
                    </View>
                  </Animated.View>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Animated.View style={{ opacity: hidden }}>
                    <TouchableOpacity onPress={() => this._flipCard()}>
                      <Text
                        style={{
                          marginBottom: 5,
                          marginTop: 15,
                          fontWeight: "700",
                          fontSize: 17,
                          display: this.state.hideBtn
                            ? "none"
                            : "flex"
                        }}
                      >
                        Answer!
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View style={{ opacity: visible }}>
                    <Buttons style={[styles.container, {display: this.state.hideBtn ? "flex" : "none"}]} primary={teal} secondary={lightGray} primaryTitle="Incorrect" secondaryTitle="Correct" onPressPrimary={this._incorrectAnswer(question.bool)} onPressSecondary={this._correctAnswer(question.bool)} />
                  </Animated.View>
                </View>
              </View>;
          })}
        </ScrollView>
        <Modal visible={this.state.visible} animationType="slide" onRequestClose={this._close}>
          <View style={styles.scrollContainer}>
            <Text style={[styles.questionText, {marginBottom:100}]}>
              You get <Text style={{fontWeight:'700',color:teal}}>{this.state.score}</Text> from <Text style={{fontWeight:'700',color:teal}}>{currQuiz.questions.length}</Text>
            </Text>
            <Buttons style={styles.container} primary={teal} secondary={lightGray} primaryTitle="Go Home" secondaryTitle="Repeat" onPressPrimary={() => this._goHome()} onPressSecondary={() => this._resetDeck()} />
          </View>
        </Modal>
      </View>;
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
    backfaceVisibility: "hidden" 
  },
  flipCardBack: {
    position: "absolute",
    top: 0
  },
  flipCardAndroid:{
    width,
    height: Math.ceil(height / 2),
    alignItems: "center",
    justifyContent: "center",
    
  },
  backCardAndroid:{
    position:'absolute',
  },
  innerCard: {
    backgroundColor: white,
    borderRadius: 5,
    width: Math.ceil(width - 20),
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(80, 80, 80, 0.34)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 0.5
  },
  questionText: {
    textAlign: "center",
    fontSize: 22,
    paddingHorizontal: 20
  }
});

const mapStateToProps = (decks) => ({
  decks,
})
export default connect(mapStateToProps)(QuizScreen)
