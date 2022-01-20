/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

export default function OrderItem({item}) {
  const {id, price, name} = item;
  return (
    <View
      style={{
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
      }}>
      <Text style={{fontWeight: '600', fontSize: 16, margin: 2}}>{name}</Text>
      <Text style={{opacity: 0.7, fontSize: 16, margin: 2}}>{'₹' + price}</Text>
    </View>
  );
}
