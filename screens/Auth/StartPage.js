import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image } from 'react-native';

function StartPageScreen({ navigation }) {
  
    useEffect(()=>{
        setTimeout(() => GoToLoginScreen(), 1000);
     }, []);

    function GoToLoginScreen(){
        navigation.navigate('Auth')
    }

  return (
     <View style={styles.container}>
        <View style={styles.iconArea}>
            <Image style={{width: '40%', resizeMode: 'contain'}} source={require('../../assets/image/IconMoa.png')} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  iconArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 80,
  }
});

export default StartPageScreen;
