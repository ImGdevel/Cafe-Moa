import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function MyPageScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>마이페이지 입니다.</Text>
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

export default MyPageScreen;