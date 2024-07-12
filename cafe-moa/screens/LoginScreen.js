import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('HomeTabs')} />
    </View>
  );
};

export default LoginScreen;
