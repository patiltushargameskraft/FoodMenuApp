/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import SearchPage from '../components/home/SearchBar';

export default function Search({route, navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <SearchPage route={route} navigation={navigation} />
      <Divider width={1} />
      <BottomTabs navigation={navigation} tab="search"/>
    </SafeAreaView>
  );
}
