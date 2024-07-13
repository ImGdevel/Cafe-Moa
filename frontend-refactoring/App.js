// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from '@navigation/MainStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
