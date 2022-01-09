import React from 'react';
import {Button, View} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go to  Deatails Page"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default Home;
