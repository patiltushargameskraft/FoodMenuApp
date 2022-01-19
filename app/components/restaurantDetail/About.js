/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, Image} from 'react-native';
import { MyIcon } from '../home/BottomTabs';

export default function About(props) {
  let {resId, name, image, description} = props.route.params;
  const navigation = useNavigation();
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} /> 
      <RestaurantDescription description={description} />
      <View style={{marginTop: 10, marginBottom: 10}}>
      <MyIcon name="search" size = {35} onPressGo={() => {navigation.navigate('Search', {
        resId: resId,
        resName: name,
      })}} />  
      </View>
    </View>
  );
}

const RestaurantImage = props => (
  <Image source={{uri: props.image}} style={{width: '100%', height: 150}} />
);

const RestaurantName = props => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: '600',
      marginTop: 10,
      marginHorizontal: 15,
    }}>
    {props.name}
  </Text>  
);

const RestaurantDescription = props => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: '400',
      fontSize: 15.5,
    }}>
    {props.description}
  </Text>
);
