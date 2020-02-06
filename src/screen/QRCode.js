import React, { Component } from 'react';

import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default class screen extends Component {
  render() {
    return(
        <View>
            <Text>QR</Text>
            <Button title="HTTP Request" onPress={() => {this.props.navigation.navigate('HttpPerson')}}/>
        </View>
    )
  }
}
