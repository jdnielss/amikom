//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import Database from '../database/database';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header, Body, Title} from 'native-base';

// create a component
const db = new Database();

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
    };
  }

  componentDidMount() {
    this.getUser();
    this.deleteListUser();
  }

  getUser() {
    let user = [];
    db.users()
      .then(users => {
        user = users;
        this.setState({
          users,
          isLoading: false,
        });
        console.warn(user.length);
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
        console.log(result, 'DELETE');
        //   this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  renderItem = ({item, index}) => {
    return (
      <ListItem
        key={index}
        title={item.userName}
        subtitle={item.userId}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <>
      <Header>
      <Body>
        <Title>Http Request</Title>
      </Body>
      </Header>
      <View style={{flex: 3}}>
        <FlatList data={this.state.users} renderItem={this.renderItem} />
      </View>
      <View style={{flex: 1}}>
        {/* <FlatList data={this.state.users} renderItem={this.renderItem} /> */}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View>
          <Button title="Insert">Insert</Button>
        </View>
        <View>
          <Button title="Insert">Insert</Button>
        </View>
        </View>
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
