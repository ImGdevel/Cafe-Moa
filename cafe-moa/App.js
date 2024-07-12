import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from '@navigation/MainStackNavigator';

function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

export default App;
