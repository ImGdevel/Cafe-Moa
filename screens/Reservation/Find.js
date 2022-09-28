import * as React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

function FindScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Find Screen</Text>
      <Button
        title="예약하기"
        onPress={() => navigation.navigate("Reservation")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FindScreen;
