/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const checkMark = require('../../assets/images/tick-mark.png')


const allCategories = [
  {
    image: require('../../assets/images/shopping-bag.png'),
    text: 'Dish',
  },
  {
    image: require('../../assets/images/soft-drink.png'),
    text: 'Cuisine',
  },
  {
    image: require('../../assets/images/bread.png'),
    text: 'Categories',
  },
  {
    image: require('../../assets/images/fast-food.png'),
    text: 'Description',
  },
  {
    image: require('../../assets/images/deals.png'),
    text: 'Restaurants',
  },
];

export default function Categories(props) {
  let items = allCategories;
  if(typeof props.route.params !== 'undefined'){
    items = allCategories.slice(0, 4);
  }

  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingLeft: 20,
      }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>From  </Text>
        {items.map((item, index) => (
          <TouchableOpacity key = {index} activeOpacity = { .5 } onPress={() => props.changeSearch(index) }>
          <View style={{alignItems: 'center', marginRight: 30}}>
            <Image
              source={props.searchType === index ? checkMark: item.image}
              style={{
                width: 50,
                height: 40,
                resizeMode: 'contain',
              }}
            />
            <Text style={{fontSize: 13, fontWeight: '900'}}>{item.text}</Text>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
