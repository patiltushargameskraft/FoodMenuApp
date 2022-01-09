import React from 'react';
import { Button } from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const Details = ({ navigation }) => {

  return (
         <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Button
          title="Go to Home Page"
          onPress={() =>
          navigation.navigate('Home')
    }
  />
        <View/>
      </ScrollView>
  );
};

export default Details;
