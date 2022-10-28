import * as React from 'react';
import { Button, View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Dimensions} from 'react-native';

import getConfirmReservationStyle from "../../styles/screens/ConfirmReservationStyle";

function ConfirmReservationScreen({ navigation }) {
  function InfoReservation() {
    //navigation.navigate()
  }
  
  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style={getHomeStyle.homeText}>
        <Text style={{ fontWeight: "700", fontSize: 65 }}>Info Your Reservation</Text>
      </View>

      <View style={getHomeStyle.contentContainer}>
        <TouchableOpacity
          style={getHomeStyle.btnInfoReservation}
          onPress={() => navigation.navigate("Reservation")}
        >
          <Text style={{ color: "#ccc", fontSize: 30, margin: 10 }}>
            카페 위치 및 이름 :
          </Text>
          <Text style={{ color: "#ccc", fontSize: 20, margin: 10 }}>
            
          </Text>
          <Text style={{ color: "#ccc", fontSize: 20, margin: 10 }}>
            예약시간 :
          </Text>
          <Text style={{ color: "#ccc", fontSize: 20, margin: 10 }}>
            예약한 좌석 :
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ConfirmReservationScreen;