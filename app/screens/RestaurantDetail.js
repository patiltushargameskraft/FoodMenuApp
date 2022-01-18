/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-elements';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import ViewCart from '../components/restaurantDetail/ViewCart';
import axios from 'axios';

// const foods = [
//   {
//     id: 1,
//     title: 'Lasagna',
//     description: 'With butter lettuce, tomato and sauce bechamel',
//     price: '$13.50',
//     image:
//       'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
//   },
//   {
//     id: 2,
//     title: 'Tandoori Chicken',
//     description:
//       'Amazing Indian dish with tenderloin chicken off the sizzles 🔥',
//     price: '$19.20',
//     image: 'https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg',
//   },
//   {
//     id: 3,
//     title: 'Chilaquiles',
//     description:
//       'Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽',
//     price: '$14.50',
//     image:
//       'https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg',
//   },
//   {
//     id: 4,
//     title: 'Chicken Caesar Salad',
//     description:
//       'One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!',
//     price: '$21.50',
//     image:
//       'https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da',
//   },
//   {
//     id: 5,
//     title: 'Lasagna',
//     description: 'With butter lettuce, tomato and sauce bechamel',
//     price: '$13.50',
//     image:
//       'https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg',
//   },
// ];

export default function RestaurantDetail({route, navigation}) {
  const [foods, setFoods] = useState([]);

  const fetchFoods = resId => {
    const getDishesUrl = `http://localhost:3000/restaurant/getDishes/${resId}`;

    axios.get(getDishesUrl).then(res => {
      setFoods(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    fetchFoods(route.params.resId);
  }, [route.params.resId]);

  return (
    <View>
      <About route={route} />
      <Divider width={1.8} style={{marginVertical: 20}} />
      <MenuItems restaurantId={route.params.resId} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  );
}
