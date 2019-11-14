/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


/// Importing baisc react elements
import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'


/// Importing navigator librarys
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';


/// Importing Screens
import { SettingsScreen } from './app/screens/Main'
import MenuScreen from './app/screens/Menu';
import { CouplesScreen } from './app/screens/Playground'



export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <StackNavigator />
    );
  }
}



// This element will be introduced onto the Stack Navigator component above.
const TabNavigator = createAppContainer(
  createMaterialBottomTabNavigator({
    Menu: {
      screen: MenuScreen,
      navigationOptions: {
        tabBarLabel: 'Menú',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'Ajustes',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="gear" color={tintColor} size={24} />
        )
      }
    },
  }, {
    initialRouteName: 'Menu',
    activeColor: 'rgba(15,15,140,1)',
    inactiveColor: 'rgba(30,30,30,1)',
      barStyle: { backgroundColor: 'white' },
    shifting: true,
  })
);


const StackNavigator = createAppContainer(
  createStackNavigator({
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: () => ({
        header: null
      })
    },
    Couples: {
      screen: CouplesScreen,
      navigationOptions: () => ({
        title: 'couples'
      }),
    }
  })
);



/**
 *  Navigation tree
 *
 * Stack Navigator
 *  - TabNavigator
 *    - MenuScreen
 *    - SettingsScreen
 *  - CouplesScreen
 *  - WinScreen
 *
 *
 */





