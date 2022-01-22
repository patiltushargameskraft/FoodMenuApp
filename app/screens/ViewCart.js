/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../components/restaurantDetail/OrderItem';
import BottomTabs from '../components/home/BottomTabs';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ViewCart({navigation}) {
  const [data, setData] = useState([]);
  const {restaurantId} = useSelector(state => state.cartReducer.selectedItems);
  const [updated, setUpdated] = useState(false);
  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const getOrders = () => {
    axios
      .get('https://food-menu-app-backend.herokuapp.com/cart/1')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const total = items => {
    let cost = 0,
      addonCost = 0;
    console.log('totol', items);
    for (let i = 0; i < items.length; i++) {
      cost += items[i].price * items[i].quantity;
      addonCost += items[i].addons
        .map(addon => addon.price * items[i].quantity)
        .reduce((prev, curr) => prev + curr, 0);
    }
    return [cost, addonCost];
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
      color: 'black',
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
      color: 'black',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const dispatch = useDispatch();

  const selectItem = (item, number, counterType) => {
    console.log(JSON.stringify(item) + '##########################');
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...{
          id: item.dish_id,
          qty: number,
          addons: item.addons,
          price: item.price,
        },
        restaurantId: item.restaurant_id,
        counterType: counterType,
        orderId: item.order_id,
      },
    });
    setUpdated(!updated);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>Your Cart</Text>
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                  title="+"
                  buttonStyle={{
                    backgroundColor: '#000',
                    marginTop: 30,
                    marginRight: 5,
                  }}
                  onPress={() => {
                    getOrders();
                    selectItem(item, 1, '+');
                  }}
                />
                <Button
                  title="-"
                  buttonStyle={{backgroundColor: '#000', marginTop: 30}}
                  onPress={() => {
                    getOrders();
                    selectItem(item, 1, '-');
                  }}
                />
              </View>
              <OrderItem item={item} />
            </View>
          ))}
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
                if (data.length) {
                  navigation.navigate('OrderCompleted');
                } else {
                  navigation.navigate('Home');
                }
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
                ₹ {renderTotal(total(data))}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}

const renderTotal = total => {
  return <Text>{total[0] + total[1]}</Text>;
};
