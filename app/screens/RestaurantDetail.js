/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import { Image } from 'react-native-elements';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import axios from 'axios';
import BottomTabs from '../components/home/BottomTabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from 'react-native-check-box';
import {MyIcon} from '../components/home/BottomTabs';
import { useDispatch, useSelector } from 'react-redux';
import { addResToFavThunk, removeResFromFavThunk } from '../redux/reducers/favReducer';


export default function RestaurantDetail({route, navigation}) {
  const {userId} = useSelector(state => state.userReducer);
  const isResFav = useSelector(state => state.favReducer.isResFav);
  const isChecked = isResFav[route.params.resId];
  const dispatch = useDispatch();
  const [foods, setfoods] = useState([]);
  useEffect(() => {
    axios
      .get(`https://food-menu-app-backend.herokuapp.com/restaurant/getDishes/${route.params.resId}`)
      .then(res => {
        setfoods(res.data.data);
      });
  }, []);

  const Delete = resId => {
    dispatch(removeResFromFavThunk(userId, resId));
  };
  const Add = resId => {
    dispatch(addResToFavThunk(userId, resId));
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
            }}
            isChecked={isChecked}
            rightText={'Favourite'}
            rightTextStyle={{color: 'black'}}
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
            tab="search"
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
