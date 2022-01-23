/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import BottomTabs from '../components/home/BottomTabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';


export default function EmptyCart({navigation}) {
  return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
        <LottieView
            style={{height: 300, alignSelf: 'center', marginBottom: 20}}
            source={require('../assets/animations/4496-empty-cart.json')}
            autoPlay
            speed={0.5}
            loop={true}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10, alignSelf: 'center'}}>
            GOOD FOOD IS ALWAYS COOKING
        </Text>
        <Text style={{fontSize: 15, marginTop: 10, alignSelf: 'center'}}>
            Your cart is empty.
        </Text>
        <Text style={{fontSize: 15, margin: 5, alignSelf: 'center'}}>
            Add something from the menu
        </Text>
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
                marginVertical: 10,
                alignSelf: 'center',
                }}
                onPress={() => {
                navigation.navigate('Home')
                }}
            />
        </View>
        <BottomTabs navigation={navigation} tab="shopping-cart"/>
    </SafeAreaView>
  )
}
