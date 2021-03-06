import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import RestaurantDetail from './screens/RestaurantDetail';
import Search from './screens/Search';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from './redux/store';
import OrderCompleted from './screens/OrderCompleted';
import ViewCart from './screens/ViewCart';
import Fav from './screens/Fav';
import Login from './screens/Login';
import Signup from './screens/Signup';

const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="ViewCart" component={ViewCart} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Fav" component={Fav} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
