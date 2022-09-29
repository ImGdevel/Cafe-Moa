import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function ReservaionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Cafe Reservaion</Text>

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

export default ReservaionScreen;