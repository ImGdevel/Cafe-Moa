import React, { useState } from "react";
import { Button, View, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

function ReservationScreen({ navigation }) {
  const [selectedSeat, setSelectedSeat] = useState("1");
  return (
    <View style={styles.container}>
      <React.Fragment>
        <View style={styles.imgBox}>
          <Image
            //source={require("../../image/coffeebayLogo_test.jpg")}
            style={styles.cafeLogo}
          />
        </View>
        <React.Fragment>
          <Text style={styles.cafeTitle}>Coffee Bay</Text>
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
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  imgBox: {
    display: "inline",
  },
  cafeLogo: {
    width: 100,
    height: 100,
  },
  cafeTitle: {
    fontSize: 25,
  },
});

export default ReservationScreen;