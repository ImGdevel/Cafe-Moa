import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

function ProfileScreen({ navigation }) {
    useFocusEffect(
      React.useCallback(() => {
        alert('Screen was focused');
        // Do something when the screen is focused
        return () => {
          alert('Screen was unfocused');
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [])
    );
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Button
          title="Go to Settings"
          onPress={() => navigation.navigate('Settings')}
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

export default ProfileScreen;
