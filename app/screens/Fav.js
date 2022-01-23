/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import RestaurantItems from '../components/home/RestaurantItems';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Home({navigation}) {
  const [fav, setFav] = useState([]);
  const {userId} = useSelector(state => state.userReducer);

  useEffect(() => {
    axios
      .get(`https://food-menu-app-backend.herokuapp.com/getFavRes/${userId}`)
      .then(res => {
        setFav(res.data.data);
      })
      .catch(err => console.log(err));
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
          Fav
        </Text>
        <RestaurantItems restaurantData={fav} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation} tab="heart"/>
    </SafeAreaView>
  );
}
