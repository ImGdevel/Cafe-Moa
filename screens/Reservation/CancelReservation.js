import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import getCancelReservationStyle from "../../styles/screens/CancelReservationStyle";

function CancelReservationScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => GoToHomeScreen(), 1500);
  }, []);

  function GoToHomeScreen() {
    navigation.navigate("Home");
  }

  return (
    <View style={getCancelReservationStyle.container}>
      <Text style={getCancelReservationStyle.endHeader}>
        예약이 취소되었습니다
      </Text>
      <Text>1시간 이내 예약 취소시 예약금 반환이 불가합니다.</Text>
    </View>
  );
}

export default CancelReservationScreen;
