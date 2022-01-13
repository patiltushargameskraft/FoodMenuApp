/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import BottomTabs from '../components/home/BottomTabs';
import Categories from '../components/home/Categories';
import HeaderTabs from '../components/home/HeaderTabs';
import RestaurantItems, {
  localRestaurants,
} from '../components/home/RestaurantItems';
import SearchBar from '../components/home/SearchBar';

export default function Home({navigation}) {
  const restaurantData = localRestaurants;
  const [activeTab, setActiveTab] = useState('Delivery');

  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <View style={{backgroundColor: 'white', padding: 15}}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
