import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import getReserveStyle from "../../styles/screens/ReserveEndStyle";

function ReserveEndScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => GoToHomeScreen(), 1500);
  }, []);

  function GoToHomeScreen() {
    navigation.popToTop();
    navigation.navigate("홈");
  }

  return (
    <View style={getReserveStyle.container}>
      <Text style={getReserveStyle.endHeader}>예약이 완료되었습니다.</Text>
      <Text>5분 후까지 오지 않을 시 자동취소됩니다.</Text>
    </View>
  );
}

export default ReserveEndScreen;
