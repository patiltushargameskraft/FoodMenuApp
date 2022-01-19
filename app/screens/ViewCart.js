/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import OrderItem from '../components/restaurantDetail/OrderItem';

export default function ViewCart({navigation}) {
  const [data, setData] = useState([]);
  const {restaurantId} = useSelector(state => state.cartReducer.selectedItems);

  useEffect(() => {
    axios.get('http://localhost:3000/cart/1').then(res => {
      setData(res.data.data);
    });
  }, []);

  const total = items => {
    return items.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  };

  const styles = StyleSheet.create({
    modalContainer: {
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

  return (
    <>
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantId}</Text>
          <Button
            style={{backgroundColor: '#000'}}
            title="view menu"
            onPress={() => navigation.navigate('Home')}
          />
          {data.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text>{total(data)}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                marginTop: 20,
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
    </>
  );
}
