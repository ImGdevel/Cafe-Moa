import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

function ZoomImageScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            marginTop: 50,
            marginRight: 10,
          }}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Text>
            <Ionicons
              name="close-sharp"
              style={{ fontSize: 30, color: "white" }}
            ></Ionicons>
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        style={styles.image}
        source={require("../../img/anySeatPic_text.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginBottom: 50,
  },
});

export default ZoomImageScreen;
