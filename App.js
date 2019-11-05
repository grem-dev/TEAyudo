
import React, { Component } from 'react';

import {
  Router,
  Stack,
  Scene
} from 'react-native-router-flux';


import Menu from './app/view/Menu';
import { OperationsView , MatchView} from './app/view/Playground';
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
          <Scene key="activities" component={Menu} title="Actividades" />
          <Scene key="operations" component={OperationsView} title="Operaciones" />
          <Scene key="match" component={MatchView} title="Pareja" />
        </Stack>
      </Router>
    );
  }
}
