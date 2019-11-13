
import React, { Component } from 'react';

import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux';

// Navigator that will replace router flux
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

import Menu from './app/view/Menu';
import { OperationsView, MatchView } from './app/view/Playground';
import MainView, { ConfigView } from './app/view/Main';


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <StackNavigator />
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: MainView,
  },
});

StackNavigator = createAppContainer(AppNavigator);