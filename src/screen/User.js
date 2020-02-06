//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Button, TextInput} from 'react-native';
import Database from '../database/database';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header, Body, Title} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// create a component
const db = new Database();

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      userName: 'Ahmad',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  saveUser = async () => {
    await this.setState({
      isLoading: true,
    });
    let user = {
      // userId: this.state.userId,
      userName: this.state.userName,
    };
    for (let i = 1; i <= 500; i++) {
      try {
        user.userId = i;
        const result = await db.createUser(user);
        this.getUser()
        if (result) {
          this.setState({isLoading: false});
        }
      } catch (error) {
        console.log(error);
        this.setState({
          isLoading: false,
        });
      }
    }
  };

  getUser() {
    let user = [];
    db.users()
      .then(users => {
        user = users;
        this.setState({
          users,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }
  deleteListUser() {
    // const { navigation } = this.props;
    this.setState({
      isLoading: true,
    });
    db.deleteProduct()
      .then(result => {
        this.getUser();
        console.log(result, 'DELETE');
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  updateText = (text, field) => {
    // this.state[field] = text;
    console.log(text, 'Ke ganti');
    this.setState({
      [field]: text,
    });
  };

  renderItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        title={item.userName}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <>
      <Header>
      <Body>
        <Title>Insert Delete</Title>
      </Body>
      </Header>
      <View>
          <TextInput style={{ margin: 10}}
            placeholder="Username"
            value={this.state.userName}
            onChangeText={text => this.updateText(text, 'userName')}
            editable={false}
          />
        </View>
      <View style={{flex: 4}}>
        <FlatList data={this.state.users} renderItem={this.renderItem} />
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: wp('10%')}}>
        <Button size="large" title="Insert Record" onPress={() => this.saveUser()} />
        <Button title="Delete Record" onPress={() => this.deleteListUser()}/>
        </View>
      </View>
      <View style={{alignItems: 'center', margin: 10}}>
        <Button title="QR Code" onPress={() => {this.props.navigation.navigate('RootQR')}}/>
      </View>
      </>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default User;