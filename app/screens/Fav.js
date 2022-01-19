/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView,View,Text} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import Categories from '../components/home/Categories';
import RestaurantItems from '../components/home/RestaurantItems';
import axios from 'axios';
import { fonts } from 'react-native-elements/dist/config';

export default function Home({navigation}) {
  const [fav, setFav] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/getFavRes/1').then(res => {
      setFav(res.data.data);
    });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{
          marginLeft:10,
          fontSize: 30,
          fontWeight: 'bold',
        }}>Fav</Text>
        <RestaurantItems restaurantData={fav} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs navigation={navigation}/>
    </SafeAreaView>
  );
}
