import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Signup({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!email) {
      alert('please enter a valid username');
    } else if (!password && password.length < 3) {
      alert('Please Make sure password contains atleast 3 characters');
    }
    axios
      .post('https://food-menu-app-backend.herokuapp.com/user/signup/', {
        username: email,
        password: password,
      })
      .then(res => {
        console.log(res.data.data);
        if (res.data.success) {
          navigation.navigate('Login');
        } else {
          alert('Username already exists, Please try another username');
        }
      })
      .catch(err => console.log('sign up', err));
  };

  return (
    <View style={styles.container}>
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
          underlineColorAndroid="transparent"
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
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => {
          handleSignup();
        }}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text>Already have an account? Login</Text>
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
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
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
