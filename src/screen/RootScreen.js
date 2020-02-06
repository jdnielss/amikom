import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export default class RootScreen extends Component {
  render() {
    return (
      <View>
        <Button onPress={() => this.props.navigation.navigate('Users')} title={"User"} >USER</Button>
      </View>
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