import React from 'react';
import { View, Text, Button } from 'react-native';

const ExploreScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Explore Screen</Text>
      <Button title="Go to Cafe Detail" onPress={() => navigation.navigate('CafeDetail')} />
    </View>
  );
};

export default ExploreScreen;
