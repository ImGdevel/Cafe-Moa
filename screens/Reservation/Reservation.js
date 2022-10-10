import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

import getReserveStyle from "../../styles/screens/ReserveStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

function ReservationScreen({ navigation }) {
  const [selectedSeat, setSelectedSeat] = useState("1");
  state = { open: false };

  return (
    <View style={getReserveStyle.container}>
      <View style={getFindStyle.container}>
        <View style={getFindStyle.contentContainer}>
          <CafeTable
            name={"Coffee Bay"}
            location={"용인시 처인구"}
            imgae={""}
            information={"--카페정보--"}
          />
        </View>
      </View>

      <View style={getReserveStyle.seatContainer}>
        <Image
          source={require("../../img/anySeatPic_text.png")}
          resizeMode="stretch"
          style={getReserveStyle.seatPic}
        />
      </View>

      <View style={getReserveStyle.pickerBox}>
        <Picker
          style={getReserveStyle.picker}
          selectedValue={selectedSeat}
          onValueChange={(itemValue, itemIndex) => setSelectedSeat(itemValue)}
        >
          <Picker.Item label="seat1" value="1" />
          <Picker.Item label="seat2" value="2" />
        </Picker>

        <TouchableOpacity
          style={getReserveStyle.reserveBtn}
          onPress={() => navigation.navigate("ReserveEnd")}
        >
          <Text style={{ color: "white", fontSize: 15 }}>예약하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={require("../../img/coffeebayLogo_test.jpg")}
              style={getReserveStyle.cafeLogo}
            />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default ReservationScreen;
