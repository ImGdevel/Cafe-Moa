import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";

import Ionicons from "react-native-vector-icons/Ionicons";

function AddPicScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

export default AddPicScreen;
