/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function OrderCompleted() {
  const {restaurantId} = useSelector(state => state.cartReducer.selectedItems);
  const [data, setData] = useState([]);
  const {userId} = useSelector(state => state.userReducer);

  const getOrders = () => {
    axios
      .get(`https://food-menu-app-backend.herokuapp.com/cart/${userId}`)
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  const checkOutOrders = () => {
    axios
      .delete(
        `https://food-menu-app-backend.herokuapp.com/cart/checkOutCartItems/${userId}`,
      )
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  useEffect(() => {
    getOrders();
    checkOutOrders();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          margin: 15,
          alignItems: 'center',
          height: '100%',
        }}>
        <LottieView
          style={{height: 100, alignSelf: 'center', marginBottom: 30}}
          source={require('../assets/animations/check-mark.json')}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Your order has been placed
        </Text>
        <ScrollView>
          <LottieView
            style={{height: 200, alignSelf: 'center'}}
            source={require('../assets/animations/cooking.json')}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
