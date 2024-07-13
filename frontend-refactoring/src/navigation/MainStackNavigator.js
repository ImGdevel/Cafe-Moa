import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import HomeTabNavigator from '@navigation/HomeTabNavigator';
import CafeDetailScreen from '@screens/CafeDetailScreen';
import ReservationScreen from '@screens/ReservationScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeTabs" component={HomeTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="CafeDetail" component={CafeDetailScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
