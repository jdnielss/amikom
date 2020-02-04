//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Database from '../database/database'
import { ListItem } from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons'


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
        // if (this.state.isLoading) {
        //     return (
        //         <View>
        //             <ActivityIndicator size="large" color="#00000"/>
        //         </View>
        //     )
        // }
        return (
            <View>
                <Text>LALALAL</Text>
                <FlatList
                data={this.state.users}
                renderItem={this.renderItem}
            />
            </View>
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
