import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import User from './src/screen/User';
import Person from './src/screen/Person';
import AddUser from './src/screen/AddUser';

const AppNavigator = createStackNavigator(
  {
    HttpPerson: {screen: Person},
    // Users : {screen: User},
    Add: {screen: AddUser},
    Users: {screen: User},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Add',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
