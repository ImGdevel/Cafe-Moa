import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import HomeTabNavigator from '@navigation/HomeTabNavigator';
import CafeDetailScreen from '@screens/CafeDetailScreen';
import ReservationScreen from '@screens/ReservationScreen';
import ReservationConfirmationScreen from '@screens/ReservationConfirmationScreen';
import ReviewScreen from '@screens/ReviewScreen';
import BookMarkScreen from '@screens/BookMarkScreen';
import MyReviewScreen from '@screens/MyReviewScreen';
import OptionScreen from '@screens/OptionScreen';
import EditProfileScreen from '@screens/EditProfileScreen';
import MemberWithdrawnScreen from '@screens/MemberWithdrawnScreen';
import { AuthContext } from '@api/AuthContext';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <Stack.Navigator initialRouteName={user ? "HomeTabs" : "Login"} >
      <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeTabs" component={HomeTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="CafeDetail" component={CafeDetailScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="ReservationConfirmation" component={ReservationConfirmationScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Bookmark" component={BookMarkScreen} />
      <Stack.Screen name="MyReview" component={MyReviewScreen} />
      <Stack.Screen name="Option" component={OptionScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="MemberWithdrawn" component={MemberWithdrawnScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
