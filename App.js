import React from 'react'
import { View } from 'react-native'
import DeckList from './components/DeckList'
import QuizScreen from './components/QuizScreen'
import { TabNavigator } from 'react-navigation'

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <Tabs/>
      </View>
    );
  }
}

const Tabs = TabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  Quiz: {
    screen: QuizScreen,
    navigationOptions: {
      tabBarLabel: 'Quiz',
    },
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor:  'white',
      style: {
        height: 56,
        backgroundColor: 'purple',
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



