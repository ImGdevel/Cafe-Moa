import * as React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import getHomeStyle from "../../styles/screens/HomeStyle";

function HomeScreen({ navigation }) {

  function ReservationInformation(){
    //navigation.navigate()
  }

  function NearbyCafe(){

  };

  function ConfirmReservation() {
    //
  }

  function MyPage() {
    //
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.homeText}><Text style={{ color: '#828282', fontWeight: "700", fontSize: 50 }}>CAFE MOA</Text></View>
      
      <View style={styles.contentContainer}>
      <TouchableOpacity style={styles.ReservationInformation} onPress = {() => navigation.navigate('Reservation')}>
        <Text style = {{color: '#828282', fontSize: 20,}}> 00 예약정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnNearbyCafe} onPress = {() => navigation.navigate('Cafe')}>
        <Text style = {{color: '#828282', fontSize: 45,}}>주변카페</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnConfirmReservation} onPress = {() => navigation.navigate('Reservation')}>
        <Text style = {{color: '#828282', fontSize: 45,}}>예약 확인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnMyPage} onPress = {() => navigation.navigate('MyPage')}>
        <Text style = {{color: '#828282', fontSize: 45,}}>마이 페이지</Text>
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
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  btnConfirmReservation:{
    width: Dimensions.get('window').width, 
    height: '20%', 
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  btnMyPage:{
    width: Dimensions.get('window').width, 
    height: '20%', 
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }

});

export default HomeScreen;
