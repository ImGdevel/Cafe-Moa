// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from '@navigation/MainStackNavigator';
import * as Notifications from "expo-notifications";

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default App;

