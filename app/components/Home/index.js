 import React from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 ``
 import styles from './styles';


 const App = () => {
 
   return (
       <ScrollView
         contentInsetAdjustmentBehavior="automatic">
         <Text style={styles.text}> Welcome To FoodMenuApp </Text>
         <View/>
       </ScrollView>
   );
 };
 
 export default App;
 