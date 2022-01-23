import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';
import MenuItems from '../restaurantDetail/MenuItems';
import RestaurantItems from './RestaurantItems';
import axios from 'axios';
import Categories from './Categories';

export default function SearchBar({route, navigation}) {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurant] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchType, setsearchType] = React.useState(0);
  const typeName = ['dishName', 'cuisine', 'dishCat', 'dishDesc', 'resName'];
  const placeholders = [
    'for Dishes',
    'Dishes by Cuisine',
    'Dishes by Categories',
    'Dishes by Description',
    'for Restaurants',
  ];
  const inResPlaceholders = [
    'for Dishes',
    'for Cuisines',
    'for Categories',
    'for Description',
  ];

  let resId = null;
  let resName = null;

  if (route.params) {
    resId = route.params.resId;
    resName = route.params.resName;
    if (searchType === 4) {
      setsearchType(0);
    }
  }

  let API_ENDPOINT = 'https://food-menu-app-backend.herokuapp.com/search';

  if (resId !== null) {
    API_ENDPOINT = `https://food-menu-app-backend.herokuapp.com/restaurant/search/${resId}`;
  }

  useEffect(() => {
    const query = {
      [typeName[searchType]]: searchQuery === null ? '' : searchQuery,
    };
    axios
      .post(API_ENDPOINT, query)
      .then(results => {
        if (typeName[searchType] === 'resName') {
          setRestaurant(results.data);
        } else {
          if (resId) {
            setFoods(results.data.data);
          } else {
            setFoods(results.data);
          }
        }
      })
      .catch(err => {
        throw err;
      });
  }, [searchQuery, searchType, resId]);

  const onChangeSearch = query => setSearchQuery(query);
  console.log('Search Type Name', typeName[searchType]);
  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <Searchbar
        placeholder={
          resId
            ? `Search in ${resName} ${inResPlaceholders[searchType]}`
            : `Search ${placeholders[searchType]}`
        }
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{height: 70, borderRadius: 10}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {typeName[searchType] === 'resName' ? (
          <RestaurantItems
            restaurantData={restaurants}
            navigation={navigation}
          />
        ) : (
          <MenuItems foods={foods} />
        )}
      </ScrollView>
      <Divider width={1} />
      <Categories
        route={route}
        searchType={searchType}
        changeSearch={index => {
          setsearchType(index);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
});
