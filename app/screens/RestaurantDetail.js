/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-elements';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import axios from 'axios';
import {Button} from 'react-native-elements/dist/buttons/Button';
import ViewCart from '../components/restaurantDetail/ViewCart';

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
<<<<<<< HEAD
      <Button
        title="Cart"
        style={{backgroundColor: '#000'}}
        onPress={() => navigation.navigate('ViewCart')}
      />
      <Divider width={1.8} style={{marginVertical: 20}} />
      <MenuItems restaurantId={route.params.resId} foods={foods} />
=======
      <MenuItems restaurantId={route.params.resId} restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
>>>>>>> c0d4e9db2a9b29fbc2cfff6d070577c7781bf186
    </View>
  );
}
