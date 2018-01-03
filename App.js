import React from 'react'
import { View, Platform } from 'react-native'
import DeckList from './components/DeckList'
import QuizScreen from './components/QuizScreen'
import { TabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { teal, lightGray, lime } from './utils/colors'

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
      tabBarIcon: ({tintColor}) => <Ionicons name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} size={30} color={tintColor} />
    },
  },
  Quiz: {
    screen: QuizScreen,
    navigationOptions: {
      tabBarLabel: 'Quiz',
      tabBarIcon: ({ tintColor }) => <Ionicons name={Platform.OS === 'ios' ? 'ios-help-circle' : 'md-help-circle'} size={30} color={tintColor} />
    },
  },
}, {
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



