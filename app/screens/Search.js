/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
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
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}
