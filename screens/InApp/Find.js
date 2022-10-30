import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";

import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

import Ionicons from "react-native-vector-icons/Ionicons";
import { sample_CafeData } from "../../lib/TestSample";

function FindScreen({ navigation }) {
  const [textInputValue, setTextInputValue] = useState("");

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
        data={sampleData[i]}
        navigation={navigation}
      />
    );
  }

  function search() {
    // search
  }

  function filter() {
    // filter
  }

  return (
    <View style={getFindStyle.container}>
      <View style={{ flex: 0.3, backgroundColor: "#ccc" }}>
        <View style={getFindStyle.searchbarContainer}>
          <TextInput
            style={getFindStyle.textinputBox}
            onChangeText={(text) => setTextInputValue(text)}
            value={textInputValue}
            placeholder="검색"
          />
          <TouchableOpacity style={getFindStyle.btnSearch} onPress={search}>
            <Ionicons
              name="search-outline"
              style={{ fontSize: 20, color: "#001D44" }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={getFindStyle.filterContainer}>
          <TouchableOpacity style={getFindStyle.btnFilter} onPress={filter}>
            <Ionicons
              name="filter-outline"
              style={{ fontSize: 20, color: "#001D44" }}
            >
              <Text style={{ fontSize: 15, color: "#001D44" }}> 필터</Text>
            </Ionicons>
          </TouchableOpacity>
        </View>
      </View>
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
  const [sampleData, setSampleData] = useState(props.data);

  return (
    <TouchableHighlight
      style={getCafeTableStyle.container}
      onPress={() =>
        props.navigation.navigate("Information", {
          data: sampleData,
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
