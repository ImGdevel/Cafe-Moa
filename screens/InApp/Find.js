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

import { sample_CafeData } from "../../lib/TestSample";

function FindScreen({ navigation }) {
  var cafeLoop = [];

  const [sampleData, setSampleData] = useState([]);

  const getData = async () => {
    setSampleData(await sample_CafeData());
  };

  useEffect(() => {
    getData();
  }, [setSampleData]);

  for (let i = 0; i < sampleData.length; i++) {
    cafeLoop.push(
      <CafeTable
        key={i}
        name={sampleData[i].getName()}
        location={sampleData[i].getAdress()}
        image={""}
        information={
          "Open : " +
          sampleData[i].getOpenTime() +
          ":00 || Close : " +
          sampleData[i].getCloseTime() +
          ":00"
        }
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
      onPress={() =>
        props.navigation.navigate("Information", {
          name: cafeName,
          location: cafeLocation,
          image: "",
          information: cafeInformation,
        })
      }
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
