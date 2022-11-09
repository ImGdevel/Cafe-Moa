import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function ImfomationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>카폐 정보 페이지 입니다.</Text>
      
      
      
      
      <Button title="카페예약 페이지로->"onPress={() => navigation.navigate('Reservaion')}/>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImfomationScreen;