import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

function ReserveEndScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => GoToHomeScreen(), 1500);
  }, []);

  function GoToHomeScreen() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.endHeader}>예약이 완료되었습니다.</Text>
      <Text>5분 후까지 오지 않을 시 자동취소됩니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  endHeader: {
    fontSize: 30,
  },
});

export default ReserveEndScreen;
