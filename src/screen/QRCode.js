import React, { Component } from 'react';

import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class screen extends Component {
  render() {
    return(
        <View style={{alignItems: 'center', justifyContent: 'center', height: hp('100%'), backgroundColor: 'white'}}>
            <QRCode
                value="https://home.amikom.ac.id/"
                size={250}
                />
        </View>
    )
  }
}
