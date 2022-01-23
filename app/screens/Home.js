/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import RestaurantItems from '../components/home/RestaurantItems';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersThunk } from '../redux/reducers/cartReducer';
import { loadFavResThunk } from '../redux/reducers/favReducer';

export default function Home({navigation}) {
  const [promotedRes, setPromotedRes] = useState([]);
  const {userId} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('https://food-menu-app-backend.herokuapp.com/').then(res => {
      setPromotedRes(res.data.data);
    }).catch(err => {
      console.log(err);
      throw err;
    });
    dispatch(getOrdersThunk());
    dispatch(loadFavResThunk(userId));
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          Welcome
        </Text>
        <RestaurantItems restaurantData={promotedRes} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} tab="home"/>
    </SafeAreaView>
  );
}
