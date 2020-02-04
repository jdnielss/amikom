//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ListItem, FlatList } from 'react-native';
import Database from '../database/database'
import { ListItem } from "react-native-elements";
// create a component
const db = new Database();

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: []
        }
    }

    componentDidMount(){
        this.getUser()
    }
    
    getUser(){
        let user = [];
        db.users().then((users) => {
            user = users;
            this.setState({
                users,
                isLoading: false
            });
        }).catch((err) =>{
            console.log(err);
            this.setState({
                isLoading: false
            })
        })
    }

    renderItem = ({item, index}) => {
        return (
            <ListItem 
                key={index}
                title={item.userName}
                bottomDivider
            />
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#00000"/>
                </View>
            )
        }if (this.state.users.length === 0) {
            <View>
                <Text>Not Found</Text>
            </View>
        }
        return (
            <FlatList
                data={this.state.users}
                renderItem={this.renderUsers}
            />
        )
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
