import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import User from './src/screen/User';
import Person from './src/screen/Person';
import AddUser from './src/screen/AddUser';
import QRCode from "./src/screen/QRCode";
import RootScreen from "./src/screen/RootScreen";
const AppNavigator = createStackNavigator(
  {
    HttpPerson: {screen: Person},
    Add: {screen: AddUser},
    Users: {screen: User},
    ShowQR: {screen: QRCode},
    RootQR: {screen: RootScreen}
  },
  {
    headerMode: 'none',
    initialRouteName: 'Users',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
