/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import RestaurantItems from '../components/home/RestaurantItems';
import axios from 'axios';
<<<<<<< HEAD
import {useDispatch, useSelector} from 'react-redux';
import {getOrdersThunk} from '../redux/reducers/cartReducer';
import {loadFavResThunk} from '../redux/reducers/favReducer';
import {Button} from 'react-native-elements/dist/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
>>>>>>> df07dcafa00a921d965fb6bf2a4c13ef0c6b5fff

export default function Home({navigation}) {
  const [promotedRes, setPromotedRes] = useState([]);
  useEffect(() => {
<<<<<<< HEAD
    axios
      .get('https://food-menu-app-backend.herokuapp.com/')
      .then(res => {
        setPromotedRes(res.data.data);
      })
      .catch(err => {
        console.log('Home', err);
      });
    dispatch(getOrdersThunk());
    dispatch(loadFavResThunk(userId));
=======
    axios.get('https://food-menu-app-backend.herokuapp.com/').then(res => {
      setPromotedRes(res.data.data);
    }).catch(err => {
      console.log(err);
      throw err;
    });
>>>>>>> df07dcafa00a921d965fb6bf2a4c13ef0c6b5fff
  }, []);

  const removeItemValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('user id removed');
      return true;
    } catch (exception) {
      return false;
    }
  };

  const handleLogout = () => {
    dispatch({
      type: 'LOG_OUT',
      payload: {
        userId: null,
      },
    });
    removeItemValue('userId');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Welcome
          </Text>
          <Button
            buttonStyle={{backgroundColor: '#111', margin: 5}}
            title="Log out"
            onPress={() => handleLogout()}
          />
        </View>
        <RestaurantItems restaurantData={promotedRes} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} tab="home" />
    </SafeAreaView>
  );
}
