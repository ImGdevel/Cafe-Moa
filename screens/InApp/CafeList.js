import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function CafeListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>CafeList</Text>
      <Button
        title="카페정보"
        onPress={() => navigation.navigate('CafeImfomation')}
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

export default CafeListScreen;