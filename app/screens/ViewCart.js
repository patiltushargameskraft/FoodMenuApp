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
import { checkOutCartThunk, modifyItemInCartThunk, increaseQuantityInCartThunk, decreaseQuantityInCartThunk } from '../redux/reducers/cartReducer';
import EmptyCart from '../components/emptyCart';

export default function ViewCart({navigation}) {
  const {restaurantId} = useSelector(state => state.cartReducer.selectedItems);
  const data = useSelector(state => state.cartReducer.selectedItems.items); 
  const [restaurantName, setRestaurantName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if(restaurantId !== null){
      axios.get(`https://food-menu-app-backend.herokuapp.com/restaurant/getResName/${restaurantId}`).then(res => {
        setRestaurantName(res.data.data[0].name);
      }).catch(err => {
        throw err;
      })
    }
  }, []);

  const selectItem = (item, number, counterType) => {
    if(counterType === '-') dispatch(modifyItemInCartThunk(item, number, counterType, restaurantId));
    else {
      dispatch(increaseQuantityInCartThunk(item.order_id));
    }
  };

  const cartTotal = total(data);

  if(data.length === 0){
    return (
      <EmptyCart navigation={navigation} />
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
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
                    selectItem(item, 1, '+');
                  }}
                />
                <Button
                  title="-"
                  buttonStyle={{backgroundColor: '#000', marginTop: 30}}
                  onPress={() => {
                    if(item.quantity === 1) selectItem(item, 1, '-');
                    else {
                      dispatch(decreaseQuantityInCartThunk(item.order_id));
                    }
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
                backgroundColor: data.length ? 'black' : 'grey',
                alignItems: 'center',
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: 'relative',
              }}
              onPress={() => {
                  dispatch(checkOutCartThunk());
                  navigation.navigate('OrderCompleted', {
                    restaurantName,
                    cartTotal
                  });
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
                ₹ {cartTotal.reduce((a,b) => a + b, 0)}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <BottomTabs navigation={navigation} tab="shopping-cart"/>
    </SafeAreaView>
  );
}

const total = items => {
  let cost = 0,
    addonCost = 0;
  for (let i = 0; i < items.length; i++) {
    cost += items[i].price * items[i].quantity;
    addonCost += items[i].addons
      .map(addon => addon.price * items[i].quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }
  return [cost, addonCost];
};

const renderTotal = total => {
  return <Text>{total[0] + total[1]}</Text>;
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