import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";

import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

function FindScreen({ navigation }) {
  const cafeArr = [
    {
      name: "스타벅스",
      location: "용인시 처인구",
      image: "",
      information: "Open : 09:00AM | Close : 21:00PM",
    },
    {
      name: "스타벅스",
      location: "용인시 처인구",
      image: "",
      information: "Open : 09:00AM | Close : 21:00PM",
    },
    {
      name: "스타벅스",
      location: "용인시 처인구",
      image: "",
      information: "Open : 09:00AM | Close : 21:00PM",
    },
    {
      name: "스타벅스",
      location: "용인시 처인구",
      image: "",
      information: "Open : 09:00AM | Close : 21:00PM",
    },
    {
      name: "스타벅스",
      location: "용인시 처인구",
      image: "",
      information: "Open : 09:00AM | Close : 21:00PM",
    },
    {
      name: "스타벅스",
      location: "용인시 처인구",
      image: "",
      information: "Open : 09:00AM | Close : 21:00PM",
    },
  ];

  var cafeLoop = [];
  for (let i = 0; i < cafeArr.length; i++) {
    cafeLoop.push(
      <CafeTable
        name={"스타벅스"}
        location={"용인시 처인구"}
        image={""}
        information={"--카페정보--"}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={getFindStyle.container}>
      <View style={{ flex: 0.3, backgroundColor: "#ccc" }}></View>
      <View style={getFindStyle.contentContainer}>
        <ScrollView>{cafeLoop}</ScrollView>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);
  return (
    <TouchableHighlight
      style={getCafeTableStyle.container}
      onPress={() => props.navigation.navigate("Information")}
      activeOpacity={0.5}
      underlayColor="#DDDDDD"
    >
      <>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image />
            {/*이지지 삽입*/}
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
    </TouchableHighlight>
  );
}

export default FindScreen;
