import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>홈 화면 입니다.</Text>
      <Button
        title="카페리스트"
        onPress={() => navigation.navigate('Cafe')}
      />
      <Button
        title="마이페이지"
        onPress={() => navigation.navigate('MyPage')}
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

export default HomeScreen;