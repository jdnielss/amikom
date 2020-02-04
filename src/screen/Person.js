//import liraries
import React, {useState} from 'react';
import { View, Text, StyleSheet, Button,  } from 'react-native';
import { getUser, createUser } from "./../service/personService";

const fetchData = async () => {
    const user = await getUser();
    return user;
}

const initialState = {
    userForm: {},
    users: [],
    isLoading: false
};

// create a component
const Person = (props) => {
    const [state, setData] = useState(initialState);

    const handleClick = () => {
        setData({...state, isLoading: true});
        fetchData()
            .then((users) => {
                setData({ ...state, isLoading: false, users });
            })
            .catch((error) => {
                console.error(error);
                setData({ ...state, isLoading: false });
            });
    }
    
    if (!state.isLoading) {
        return (
            <View style={styles.container}>
                {/* <UsersList items={state.users} /> */}
                { state.users.map((user) => {
                    return (
                        <Text >{user.name}</Text>
                    )
                })}
                <Button onClick={handleClick}>Fetch Users</Button>
            </View>
        );
    }
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Person;
