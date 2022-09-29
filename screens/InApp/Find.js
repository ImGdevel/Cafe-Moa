import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function FindScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Cafe List</Text>
      <Button
        title="카페정보"
        onPress={() => navigation.navigate('Imfomation')}
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

export default FindScreen;