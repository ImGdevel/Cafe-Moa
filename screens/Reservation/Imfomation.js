import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import getInfoStyle from "../../styles/screens/InfoStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

function InformationScreen({ navigation }) {
  const [direction, setDirection] = useState("사진");

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

        <PreviewLayout
          selectedValue={direction}
          values={["사진", "좌석"]}
          setSelectedValue={setDirection}
          style={getInfoStyle.contentLayout}
        >
          <ScrollView>
            <CafeTable
              name={"스타벅스"}
              location={"용인시 처인구"}
              imgae={""}
              imformation={"--카페정보--"}
            />
          </ScrollView>
        </PreviewLayout>
      </View>

      <Button
        title={"예약하기"}
        style={[{ backgroundColor: "black" }]}
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

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={getInfoStyle.label}>{label}</Text>
    <View style={getInfoStyle.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            getInfoStyle.button,
            selectedValue === value && getInfoStyle.selected,
          ]}
        >
          <Text
            style={[
              getInfoStyle.buttonLabel,
              selectedValue === value && getInfoStyle.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[getInfoStyle.container, { [label]: selectedValue }]}>
      {children}
    </View>
  </View>
);

export default InformationScreen;
