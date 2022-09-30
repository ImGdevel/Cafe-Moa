import React, { useState } from "react";
import { Button, View, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";

import getReserveStyle from "../../styles/screens/ReserveStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

function ReservationScreen({ navigation }) {
  const [selectedSeat, setSelectedSeat] = useState("1");
  return (
    <>
      <View style={getFindStyle.container}>
        <View style={getFindStyle.contentContainer}>
          <CafeTable
            name={"Coffee Bay"}
            location={"용인시 처인구"}
            image={""}
            imformation={"Open : AM 09:00 || Close : PM 22:00"}
          />
        </View>
      </View>

      <View style={getFindStyle.topContainer}>
        <Image
          source={require("../../img/anySeatPic_text.png")}
          style={getReserveStyle.seatPic}
        />
      </View>

      <View>
        <Picker
          selectedValue={selectedSeat}
          onValueChange={(itemValue, itemIndex) => setSelectedSeat(itemValue)}
          style={getReserveStyle.picker}
        >
          <Picker.Item label="seat1" value="1" />
          <Picker.Item label="seat2" value="2" />
        </Picker>

        <Button title="예약하기" />
      </View>
    </>
  );
}

function CafeTable(props) {
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeImformation, setCafeImformaion] = useState(props.imformation);

  return (
    <>
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
          <Text style={getCafeTableStyle.contentText}>{cafeImformation}</Text>
        </View>
      </View>
    </>
  );
}

export default ReservationScreen;
