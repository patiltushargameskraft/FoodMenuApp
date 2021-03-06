/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getOrdersThunk} from '../redux/reducers/cartReducer';
import {loadFavResThunk} from '../redux/reducers/favReducer';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const storeData = async value => {
    value = value.toString();
    try {
      await AsyncStorage.setItem('userId', value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userId');
        if (value !== null) {
          const userId1 = parseInt(value, 10);
          setUserId(userId1);
          dispatch(getOrdersThunk(userId1));
          dispatch(loadFavResThunk(userId1));
          console.log('user already login');
          navigation.navigate('Home');
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const setUserId = userId => {
    dispatch({
      type: 'USER',
      payload: {
        userId: userId,
      },
    });
  };

  const handleLogin = () => {
    console.log(email, password);
    axios
      .post('https://food-menu-app-backend.herokuapp.com/user/login', {
        username: email,
        password: password,
      })
      .then(res => {
        if (res.data.data.length) {
          setUserId(res.data.data[0].id);
          storeData(res.data.data[0].id);
          dispatch(getOrdersThunk(res.data.data[0].id));
          dispatch(loadFavResThunk(res.data.data[0].id));
          navigation.navigate('Home');
        } else {
          alert('Username or Password Incorrect');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: 'black',
            margin: 20,
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          Log In
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{
            uri: 'https://png.icons8.com/message/ultraviolet/50/3498db',
          }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="username"
          placeholderTextColor="grey"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => {
          handleLogin();
        }}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text style={{color: 'black'}}>New Here? Signup here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    color: 'black',
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});
