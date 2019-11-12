/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


// importhing components
import MainScreen from './app/screens/Main';
import MenuScreen from './app/screens/Menu';
import { MatchViewScreen } from './app/screens/playground'


const AppNavigatorStack = createStackNavigator({
  // For each screen that you can navigate to, create a new entry like this:
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,

    }),
  },
  Menu: {
    screen: MenuScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Menú de actividades'
    }),
  },
  PlayGround: {
    screen: MatchViewScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  }

});


export default App = createAppContainer(AppNavigatorStack);




