import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Header, Body, Title} from 'native-base';
import Axios from 'axios';
import {TextInput} from 'react-native-gesture-handler';

const action = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataPost, setDataPost] = useState({});
  const [responPost, setResponPost] = useState({});

  useEffect(() => {
    // setLoading(true);
    // Axios.get(`https://reqres.in/api/users`).then(res => {
    //   setPeople([...res.data.data]);
    //   setLoading(false);
    //   // console.warn(res.data.data)
    // });
    getData();
  });

  const getData = async () => {
    try {
      setLoading(true);
      const {data} = await Axios.get('https://reqres.in/api/users');
      setPeople([...data.data]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadMore = () => {
    setLoading(true);
    Axios.post('https://reqres.in/api/users', dataPost).then(res => {
      alert(JSON.stringify(res.data));
      setLoading(false);
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
  };
};

export default () => {
  const {people, loading, handleUsername, handleEmail, loadMore} = action();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header>
        <Body>
          <Title>Http Request</Title>
        </Body>
      </Header>
      <FlatList
        data={people}
        keyExtractor={item => item.url}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text>First Name: {item.first_name}</Text>
            <Text>Last Name: {item.last_name}</Text>
          </View>
        )}
        ListFooterComponent={
          <View>
            <TextInput placeholder="nama" onChangeText={handleUsername} />
            <TextInput placeholder="email" onChangeText={handleEmail} />
            <Button
              title={loading ? 'post data' : 'sedang post'}
              onPress={loadMore}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};
