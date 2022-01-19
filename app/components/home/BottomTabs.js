/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BottomTabs({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
      }}>
      <MyIcon name="home" size ={40} onPressGo={() => navigation.navigate('Home')}/>
      <MyIcon name="search" size = {35} onPressGo={() => navigation.navigate('Search')}/>
      <MyIcon name="heart" size ={35} onPressGo={() => navigation.navigate('Fav')}/>
      <MyIcon name="shopping-cart" size={40} onPressGo={() => {}}/>
    </View>
  );
}

const MyIcon = ({name, size, onPressGo}) => (
  <TouchableOpacity activeOpacity = { .5 } onPress={onPressGo} >
        <Icon name={name} size={size} color="orange" style={{alignSelf: 'center'}}/>
  </TouchableOpacity>
);
