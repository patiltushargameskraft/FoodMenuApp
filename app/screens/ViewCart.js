/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../components/restaurantDetail/OrderItem';
import Counter from 'react-native-counters';
import BottomTabs from '../components/home/BottomTabs';

export default function ViewCart({navigation}) {
  const [data, setData] = useState([]);
  const {restaurantId} = useSelector(state => state.cartReducer.selectedItems);

  useEffect(() => {
    axios.get('http://localhost:3000/cart/1').then(res => {
      setData(res.data.data);
    });
  }, [data]);

  const total = items => {
    return items.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  };

  const styles = StyleSheet.create({
    modalContainer: {
      margin: 20,
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },

    modalCheckoutContainer: {
      backgroundColor: 'white',
      padding: 16,
      height: 500,
      borderWidth: 1,
    },

    restaurantName: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 18,
      marginBottom: 10,
    },

    subtotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },

    subtotalText: {
      textAlign: 'left',
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const dispatch = useDispatch();

  const selectItem = (item, number, counterType) => {
    console.log(item + '##########################');
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...{id: item.dish_id, qty: number, addons: [], price: item.price},
        restaurantId: restaurantId,
        counterType: counterType,
        orderId: item.order_id,
      },
    });
  };

  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const isFoodInCart = (food, cartItems) => {
    const idx = cartItems.findIndex(item => item.id === food.id);
    if (idx === -1) {
      return 0;
    } else {
      return cartItems[idx].qty;
    }
  };

  return (
    <>
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantId}</Text>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#999',
              }}>
              <Counter
                onChange={(number, type) => selectItem(item, number, type)}
                start={item.quantity}
              />
              <OrderItem item={item} />
            </View>
          ))}
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text>{total(data)}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                marginTop: 20,
                marginBottom: 50,
                backgroundColor: 'black',
                alignItems: 'center',
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: 'relative',
              }}
              onPress={() => {
                navigation.navigate('OrderCompleted');
              }}>
              <Text style={{color: 'white', fontSize: 20}}>Checkout</Text>
              <Text
                style={{
                  position: 'absolute',
                  right: 20,
                  color: 'white',
                  fontSize: 15,
                  top: 17,
                }}>
                {total(data)}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <BottomTabs navigation={navigation} />
    </>
  );
}
