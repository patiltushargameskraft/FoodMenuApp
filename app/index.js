 import React from 'react';
 import Home from './components/Home'
 
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
 
 const App = () => {
 
   return (
     <SafeAreaView>
       <ScrollView
         contentInsetAdjustmentBehavior="automatic">
         <Home/>
         <View/>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 export default App;
 