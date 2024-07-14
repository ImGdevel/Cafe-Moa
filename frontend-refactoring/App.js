// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from '@navigation/MainStackNavigator';
import * as Notifications from 'expo-notifications';
import { AuthProvider } from '@api/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </AuthProvider>
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

