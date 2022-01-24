/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';

export default function About(props) {
  let {name, image, description} = props.route.params;
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = props => (
  <Image source={{uri: props.image}} style={{width: '100%', height: 150}} />
);

const RestaurantName = props => (
  <Text
    style={{
      color: 'black',
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
      color: 'black',
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: '400',
      fontSize: 15.5,
    }}>
    {props.description}
  </Text>
);
