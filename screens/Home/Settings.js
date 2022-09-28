import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings Screen~</Text>
      <Button
        title="Go to Profile!"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
