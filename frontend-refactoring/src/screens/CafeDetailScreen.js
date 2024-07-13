import React from 'react';
import { View, Text, Button } from 'react-native';

const CafeDetailScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Cafe Detail Screen</Text>
      <Button title="Reserve a Seat" onPress={() => navigation.navigate('Reservation')} />
    </View>
  );
};

export default CafeDetailScreen;
