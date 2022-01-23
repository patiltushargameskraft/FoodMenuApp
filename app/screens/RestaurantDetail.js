/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';

import {View, Text, Alert, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import axios from 'axios';
import BottomTabs from '../components/home/BottomTabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from 'react-native-check-box';
import {MyIcon} from '../components/home/BottomTabs';
import {useSelector} from 'react-redux';

export default function RestaurantDetail({route, navigation}) {
  const [foods, setfoods] = useState([]);
  const [fav, setFav] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [present, setPresent] = useState(false);
  const {userId} = useSelector(state => state.userReducer);

  useEffect(() => {
    axios
      .get(
        `https://food-menu-app-backend.herokuapp.com/restaurant/getDishes/${route.params.resId}`,
      )
      .then(res => {
        setfoods(res.data.data);
      });
  }, [route.params.resId]);
  useEffect(() => {
    axios
      .get(`https://food-menu-app-backend.herokuapp.com/getFavRes/${userId}`)
      .then(res => {
        setFav(res.data.data);
      });
    
  }, []);
  useEffect(() => {
    for (var i = 0; i < fav.length; i++) {
      if (fav[i].id == route.params.resId) {
        setChecked(true);
        console.log('set  ' + fav[i].id);
      }
    }
  })
  const Delete = x => {
    axios
      .delete(
        `https://food-menu-app-backend.herokuapp.com/restaurant/removeResFromFav/${userId}/${x}`,
      )
      .then(Alert.alert('Removed'));
  };
  const Add = x => {
    axios
      .post(
        `https://food-menu-app-backend.herokuapp.com/restaurant/addResToFav/${userId}/${x}`,
      )
      .then(Alert.alert('Added'));
  };

  return (
    <>
      <SafeAreaView style={{marginTop: 0, flex: 1}}>
        <View style={styles.fixToText}>
          <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => {
              if (!isChecked) {
                Add(route.params.resId);
              } else {
                Delete(route.params.resId);
              }
              setChecked(!isChecked);
            }}
            isChecked={isChecked}
            rightText={'Favourite'}
            rightTextStyle={{style: 'black'}}
          />
          <MyIcon
            name="search"
            size={35}
            onPressGo={() => {
              navigation.navigate('Search', {
                resId: route.params.resId,
                resName: route.params.name,
              });
            }}
          />
        </View>
        <Divider width={1} />
        <About route={route} />
        <Divider width={1.8} style={{marginVertical: 20}} />
        <MenuItems
          restaurantId={route.params.resId}
          restaurantName={route.params.name}
          foods={foods}
          navigation={navigation}
        />
        <Divider width={1} />
        <BottomTabs navigation={navigation} />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
