/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Counter from 'react-native-counters';
import axios from 'axios';

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
});

export default function MenuItems({
  restaurantId,
  foods,
  hideCheckbox,
  marginLeft,
}) {
  const dispatch = useDispatch();

  const selectItem = (item, number, type) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...{id: item.id, qty: number, addons: [], price: item.price},
        restaurantId: restaurantId,
        type: type,
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
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>
            ) : (
              <Counter
                onChange={(number, type) => selectItem(food, number, type)}
                start={isFoodInCart(food, cartItems)}
              />
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{marginHorizontal: 20}}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = props => (
  <View style={{width: 150, justifyContent: 'space-evenly', marginLeft: 10}}>
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({marginLeft, ...props}) => (
  <View>
    <Image
      source={{uri: props.food.image_url}}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginLeft: marginLeft,
      }}
    />
  </View>
);
