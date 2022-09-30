import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function ImfomationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Cafe Imfomation</Text>
      <Button
        title="카페예약"
        onPress={() => navigation.navigate('Reservaion')}
      />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default ImfomationScreen;