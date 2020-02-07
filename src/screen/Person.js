import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import {Header, Body, Title} from 'native-base';
import Axios from 'axios';

const action = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataPost, setDataPost] = useState({
    first_name: 'Ahmad', last_name: 'Dody'
  });
  const [responPost, setResponPost] = useState({});

  const getUser = async () => {
    setLoading(true);
    Axios.get(`https://reqres.in/api/users?id=2`).then(res => {
      setPeople({...res.data.data});
      setLoading(false);
      console.warn(res.data.data)
    });
  }
  const loadMore = async () => {
    await setLoading(true);
    Axios.post('https://reqres.in/api/users', dataPost).then(res => {
      setResponPost({...res.data})
      setLoading(false)
    });
  };

  const handleUsername = nama => {
    setDataPost({...dataPost, nama: nama});
  };

  const handleEmail = email => {
    setDataPost({...dataPost, email: email});
  };

  return {
    people,
    loading,
    handleUsername,
    handleEmail,
    loadMore,
    getUser, 
    responPost
  };
};

export default () => {
  const {
    people,
    loading,
    handleUsername,
    handleEmail,
    loadMore,
    getUser,
    responPost
  } = action();

  return (
    <>
      <Header>
        <Body>
          <Title>Http Request</Title>
        </Body>
      </Header>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{responPost.first_name}</Text>
        </View>          
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
         <Text>{people.first_name}</Text>
        </View>    

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', margin: 50}}>
        <Button title="POST"  onPress={loadMore}/>
        <Button title="GET"  onPress={getUser}/>
        </View>
    </>
  );
};
