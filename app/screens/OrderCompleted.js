/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function OrderCompleted() {
  const {restaurantId} = useSelector(state => state.cartReducer.selectedItems);
  const [data, setData] = useState([]);

  const getOrders = () => {
    axios
      .get('http://localhost:3000/cart/1')
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
      .delete('http://localhost:3000/cart/checkOutCartItems/1')
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  useEffect(() => {
    getOrders();
    checkOutOrders();
  }, []);

  const total = items => {
    return items.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  };

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
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Your order at {restaurantId} has been placed for {'₹' + total(data)}
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
