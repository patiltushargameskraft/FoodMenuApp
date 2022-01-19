/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
<<<<<<< HEAD
import SearchPage from '../components/home/SearchBar';

export default function Search({route, navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <SearchPage route={route} navigation={navigation} />
=======
import Categories from '../components/home/Categories';
import SearchPage from '../components/home/SearchBar';

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
>>>>>>> 047027a4704c003daeb9d2a5b6be0360bd54ce2d
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}
