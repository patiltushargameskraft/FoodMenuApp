/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

export default function OrderItem({item}) {
  const {title, qty, price} = item;
  const totalPrice = qty * price;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
      }}>
      <Text style={{fontWeight: '600', fontSize: 16}}>{title}</Text>
      <Text style={{opacity: 0.7, fontSize: 16}}>{totalPrice}</Text>
    </View>
  );
}
