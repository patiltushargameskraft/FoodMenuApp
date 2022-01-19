/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-elements';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';
import axios from 'axios'

export default function RestaurantDetail({route, navigation}) {

  const [foods, setfoods] = useState([])
  
  useEffect(() => {
    axios.get(`http://localhost:3000/restaurant/getDishes/${route.params.resId}`).then(res => {
      setfoods(res.data.data);
    });
  }, []);


  return (
    <View>
      <About route={route} />
      <Divider width={1.8} style={{marginVertical: 20}} />
      <MenuItems restaurantId={route.params.resId} restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  );
}
