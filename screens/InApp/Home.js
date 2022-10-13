import * as React from 'react';
import { Button, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Dimensions} from 'react-native';

function HomeScreen({ navigation }) {

  
  function NearbyCafe(){
    //navigation.navigate()
  };

  function ConfirmReservation(){
    //
  };

  function MyPage(){
    //
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.homeText}><Text style={{ fontWeight: "700", fontSize: 65 }}>CAFE MOA</Text></View>
      
      <View style={styles.contentContainer}>
      <TouchableOpacity style={styles.btnNearbyCafe} onPress = {() => navigation.navigate('Cafe')}>
        <Text style = {{color: 'black', fontSize: 45,}}>주변카페</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnConfirmReservation} onPress = {() => navigation.navigate('Reservation')}>
        <Text style = {{color: 'black', fontSize: 45,}}>예약 확인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnMyPage} onPress = {() => navigation.navigate('MyPage')}>
        <Text style = {{color: 'black', fontSize: 45,}}>마이 페이지</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeText: {
    marginTop: '20%',
    marginBottom: '20%',
  },
  
  btnNearbyCafe:{
    width: Dimensions.get('window').width, 
    height: '20%', 
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  btnConfirmReservation:{
    width: Dimensions.get('window').width, 
    height: '20%', 
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  btnMyPage:{
    width: Dimensions.get('window').width, 
    height: '20%', 
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }

});

export default HomeScreen;