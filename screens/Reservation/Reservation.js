import React, { useState } from "react";
import { Button, View, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

import getReserveStyle from "../../styles/screens/ReserveStyle";

function ReservationScreen({ navigation }) {
  const [selectedSeat, setSelectedSeat] = useState("1");
  return (
    <View style={getReserveStyle.container}>
      <React.Fragment>
        <View style={getReserveStyle.imgBox}>
          <Image
            source={require("../../img/coffeebayLogo_test.jpg")}
            style={getReserveStyle.cafeLogo}
          />
        </View>
        <React.Fragment>
          <Text style={getReserveStyle.cafeTitle}>Coffee Bay</Text>
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

export default ReservationScreen;
