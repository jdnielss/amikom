import React,{Component} from 'react'
import {View} from 'react-native';
import { RNCamera } from 'react-native-camera'

class Scanner extends Component {

    constructor(props){
      super(props);
      this.state = {
        dataQR : ''
      }
    }

    sendData = (data) => {
      // console.log(data, 'DAta QR')
      this.props.navigation.navigate('RootQR', {dataQR: data})
    }

  render() {
        return (
              <View style={{flex: 1}}>
                <RNCamera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  style={{
                    flex: 1,
                  }}
                  onBarCodeRead={(data) => {this.sendData(data)}} >
                </RNCamera>
              </View> );
  }
}

export default Scanner;