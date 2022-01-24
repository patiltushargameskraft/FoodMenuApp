/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export default function RestaurantItems({navigation, ...props}) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{marginBottom: 10}}
          onPress={() =>
            navigation.navigate('RestaurantDetail', {
              resId: restaurant.id,
              name: restaurant.name,
              image: restaurant.image_url,
              description: restaurant.description,
            })
          }>
          <View style={{marginTop: 10, padding: 15, backgroundColor: 'white'}}>
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = props => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{width: '100%', height: 180}}
    />
  </>
);

const RestaurantInfo = props => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    }}>
    <View>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
        {props.name}
      </Text>
      <Text style={{fontSize: 13, color: 'black'}}>30-45 • min</Text>
    </View>
  </View>
);
