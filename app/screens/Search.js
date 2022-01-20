/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import RestaurantItems from '../components/home/RestaurantItems';
import SearchPage from '../components/home/SearchBar';
import axios from 'axios';

export default function Search({route, navigation}) {

  

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <SearchPage route = {route} navigation={navigation}/>
      <Divider width={1} />
      <BottomTabs navigation={navigation}/>
    </SafeAreaView>
  );
}
