/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
<<<<<<< HEAD
import Categories from '../components/home/Categories';
=======
import RestaurantItems from '../components/home/RestaurantItems';
>>>>>>> 1ce2fbd3f0abdc109d3de13c2e9049508ee6e8d5
import SearchPage from '../components/home/SearchBar';

<<<<<<< HEAD
export default function Search({navigation}) {
  const [activeSearch, setactiveSearch] = useState(0);

  const changeSearch = index => {
    setactiveSearch(index);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <SearchPage navigation={navigation} searchType={activeSearch} />
      <Divider width={1} />
      <Categories activeSearch={activeSearch} changeSearch={changeSearch} />
=======
export default function Search({route, navigation}) {

  

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <SearchPage route = {route} navigation={navigation}/>
>>>>>>> 1ce2fbd3f0abdc109d3de13c2e9049508ee6e8d5
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}
