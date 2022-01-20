/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';

import {View, Text, Alert, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import About from '../components/restaurantDetail/About';
import MenuItems from '../components/restaurantDetail/MenuItems';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Button} from 'react-native-elements/dist/buttons/Button';
import ViewCart from '../components/restaurantDetail/ViewCart';
import BottomTabs from '../components/home/BottomTabs';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome';
export default function RestaurantDetail({route, navigation}) {
  const [foods, setfoods] = useState([]);
  const [fav, setFav] = useState([]);
  const [present, setPresent] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/restaurant/getDishes/${route.params.resId}`)
      .then(res => {
        setfoods(res.data.data);
      });
  }, [route.params.resId]);

  Delete = x => {
    axios
      .delete(`http://localhost:3000/restaurant/removeResFromFav/1/${x}`)
      .then(Alert.alert('Removed'));
  };
  Add = x => {
    axios;

    axios
      .post(`http://localhost:3000/restaurant/addResToFav/1/${x}`)
      .then(Alert.alert('Added'));
  };

  return (
    <>
    <SafeAreaView style={{marginTop: 0,flex: 1}}>
    <View style={styles.fixToText}>
        <Button
          title=" Remove Fav   "
          style={{backgroundColor: '#000'}}
          onPress={() => this.Delete(route.params.resId)}
        />
        <Button
          title="   Add Fav           "
          style={{backgroundColor: '#000'}}
          onPress={() => this.Add(route.params.resId)}
        />
      </View>
  
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
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
