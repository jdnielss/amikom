import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

const Header = props => {
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          right: '40%',
        }}>
        {props.title ? props.title : 'Title Header'}
      </Text>
    </View>
  );
};

export default withNavigation(Header);
