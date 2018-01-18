import React from 'react'
import { createStore }  from 'redux'
import { Provider } from 'react-redux'
import decks from './reducers'
import { View, Platform, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import AddDeckScreen from './components/AddDeckScreen'
import SingleDeck from './components/SingleDeck'
import QuizScreen from './components/QuizScreen'
import AddCardScreen from './components/AddCardScreen'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { teal, lightGray, lime } from './utils/colors'
import { Constants } from 'expo'
import { setLocalNotification } from "./utils/api";

const store = createStore(decks)

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = TabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => <Ionicons name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} size={30} color={tintColor} />
    },
  },
  Add: {
    screen: AddDeckScreen,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} size={30} color={tintColor} />
    },
  },
},{
  animationEnabled:true,
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? teal : lightGray,
    showIcon:true,
    indicatorStyle:{
      backgroundColor: lime
    },
    upperCaseLabel:false,
    style: {
      height: Platform.OS === 'ios' ? 55 : 65,
      backgroundColor: Platform.OS === 'ios' ? lightGray : teal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigation = StackNavigator({
  Home:{
    screen:Tabs,
    navigationOptions:{
      header:null
    }
  },
  SingleDeck:{
    screen:SingleDeck,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.deckId} Quiz`,
      headerBackTitle: 'Back',
    })
  },
  Quiz: { 
    screen:QuizScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckId} Questions`,
      headerBackTitle: 'Back',
    })
  },
  AddCard: {
    screen: AddCardScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Add Card to ${navigation.state.params.deckId} Deck`,
      headerBackTitle: 'Back',
    })
  }
},{
    navigationOptions:{
      headerTintColor:teal
    }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          <AppStatusBar backgroundColor={teal} barStyle="light-content"/>
          <MainNavigation/>
        </View>
      </Provider>
    );
  }
}