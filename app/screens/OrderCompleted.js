/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';

export default function OrderCompleted({route, navigation}) {
  const {restaurantName, cartTotal} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          margin: 15,
          alignItems: 'center',
          height: '100%',
        }}>
        <LottieView
          style={{height: 100, alignSelf: 'center', marginBottom: 30}}
          source={require('../assets/animations/check-mark.json')}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Your order at {restaurantName} has been placed for {cartTotal.reduce((a,b) => a + b, 0)}
        </Text>
        <ScrollView>
          <LottieView
            style={{height: 200, alignSelf: 'center'}}
            source={require('../assets/animations/cooking.json')}
            autoPlay
            speed={0.5}
          />
          <Button
          title="BROWSE RESTAURANTS"
          buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
          padding: 10,
          }}
          type="outline"
          raised
          titleStyle={{ color: 'orange', fontSize: 15 }}
          containerStyle={{
          marginHorizontal: 50,
          marginVertical: 50,
          alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate('Home')
          }}
        />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
