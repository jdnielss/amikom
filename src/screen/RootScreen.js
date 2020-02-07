import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import {Header, Body, Title} from 'native-base';

export default class RootScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result : ''
    }
  }

  juan = () =>{
    const res = this.props.navigation.getParam('dataQR');
    console.log(res.data, 'lalalalalalalalala')
    this.setState({
      result : res.data
    })
  }
  componentDidMount(){
    this.juan();
  }

  render() {
    // console.log(this.props.navigation, 'Navigation aaaaa')
    // const {params} = this.props.navigation.state

    // console.log(params, 'JAJJAJJJAJA')
      // console.log(this.props.navigation.getParam('dataQR'), 'DataQR')
      // const result = this.props.navigation.getParam('dataQR')
    return (
      <>
      <Header>
        <Body>
          <Title>QR Scan</Title>
        </Body>
      </Header>
      <View style={{alignItems: 'center', justifyContent: 'center', margin: 100}}>
        <Text>{this.state.result}</Text>
      </View>
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('ScannerQR')} title="Scan QR"/>
      </View>
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('ShowQR')} title="Show QR"/>
      </View>
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('HttpPerson')} title="HTTP Request"/>
      </View>
      </>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});