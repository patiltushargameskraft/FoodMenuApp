/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import Categories from '../components/home/Categories';
import RestaurantItems from '../components/home/RestaurantItems';
import SearchBar from '../components/home/SearchBar';
import axios from 'axios';

export default function Home({navigation}) {
  const [promotedRes, setPromotedRes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/').then(res => {
      setPromotedRes(res.data.data);
    });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <Categories />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantItems restaurantData={promotedRes} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
