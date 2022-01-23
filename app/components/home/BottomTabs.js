/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BottomTabs({navigation, tab}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
      }}>
      <MyIcon
        name="home"
        size={40}
        onPressGo={() => navigation.navigate('Home')}
        tab={tab}
      />
      <MyIcon
        name="search"
        size={35}
        onPressGo={() => navigation.navigate('Search')}
        tab={tab}
      />
      <MyIcon
        name="heart"
        size={35}
        onPressGo={() => navigation.navigate('Fav')}
        tab={tab}
      />
      <MyIcon
        name="shopping-cart"
        size={40}
        onPressGo={() => navigation.navigate('ViewCart')}
        tab={tab}
      />
    </View>
  );
}

export const MyIcon = ({name, size, onPressGo, tab}) => (
  <TouchableOpacity activeOpacity={0.5} onPress={onPressGo}>
    <Icon
      name={name}
      size={size}
      color="orange"
      style={tab === name ? styles.colorDark : styles.colorLight}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  colorLight: {
    color: '#aaa',
    alignSelf: 'center',
  },
  colorDark: {
    color: 'orange',
    alignSelf: 'center',
  },
});

