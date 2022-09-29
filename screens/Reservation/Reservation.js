import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

{
  /*___const seats = () => {
  {
    value: "seat number";
    label: "Seat Number";
  }
};___*/
}

function ReservationScreen({ navigation }) {
  const [selectedSeat, setSelectedSeat] = useState("1");
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Reservation Screen</Text>

      <React.Fragment>
        <React.Fragment>
          <Text>Here is image box</Text>
        </React.Fragment>
        <React.Fragment>
          <Text>Here is Cafe Name span</Text>
          <Text>Here is Cafe Info span</Text>
        </React.Fragment>
      </React.Fragment>

      <React.Fragment>
        <Text>Here is Cafe Seat's box</Text>
      </React.Fragment>

      <React.Fragment>
        <Text>Here is for reservation</Text>
        <Picker
          selectedValue={selectedSeat}
          onValueChange={(itemValue, itemIndex) => setSelectedSeat(itemValue)}
        >
          <Picker.Item label="seat1" value="1" />
          <Picker.Item label="seat2" value="2" />
        </Picker>

        <Button title="예약하기" />
      </React.Fragment>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pageTitle: {
    fontSize: 40,
  },
});

export default ReservationScreen;
