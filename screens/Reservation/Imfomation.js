import React, { useState } from "react";
import { Button, View, Text, Image } from "react-native";

import getInfoStyle from "../../styles/screens/InfoStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

function InformationScreen({ navigation }) {
  return (
    <>
      <View style={getInfoStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              name={"Coffee Bay"}
              location={"용인시 처인구"}
              imgae={""}
              information={"Open : AM 09:00 || Close : PM 22:00"}
            />
          </View>
        </View>

        <View style={getFindStyle.contentContainer}>
          <Button title={"사진"} style={getInfoStyle.infoBtn} />
          <Button title={"좌석배치"} style={getInfoStyle.infoBtn} />
          <View style={getFindStyle.topContainer}></View>
        </View>
      </View>

      <Button
        title={"예약하기"}
        style={getInfoStyle.infoBtn}
        onPress={() => navigation.navigate("Reservation")}
      />
    </>
  );
}

function CafeTable(props) {
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);

  return (
    <>
      <View style={getCafeTableStyle.imageContainer}>
        <View style={getCafeTableStyle.image}>
          <Image
            source={require("../../img/coffeebayLogo_test.jpg")}
            style={getInfoStyle.cafeLogo}
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
    </>
  );
}

export default InformationScreen;
