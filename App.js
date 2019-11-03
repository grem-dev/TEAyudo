
import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux';


import Home from './app/view/Home';
import { OperationsView } from './app/view/Playground';
import MainView,{ ConfigView } from './app/view/Main';


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene default key="main" component={MainView} hideNavBar />
          <Scene key="activities" component={Home} title="Actividades" />
          <Scene key="operations" component={OperationsView} title="Operaciones" />
        </Stack>
      </Router>
    );
  }
}
