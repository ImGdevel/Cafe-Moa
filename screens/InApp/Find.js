import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";

function FindScreen({ navigation }) {
  return (
    <View style={FindStyles.container}>
      <View style={FindStyles.topContainer}></View>
      <View style={FindStyles.contentContainer}>
        <ScrollView>
          <CafeTable
            name={"스타벅스"}
            location={"용인시 처인구"}
            imgae={""}
            information={"--카페정보--"}
            navigation={navigation}
          />
          <CafeTable
            name={"스타벅스"}
            location={"제주도"}
            imgae={""}
            information={"--카페정보--"}
            navigation={navigation}
          />
          <CafeTable
            name={"투썸 플레이스"}
            location={"평양"}
            imgae={""}
            information={"--카페정보--"}
            navigation={navigation}
          />
          <CafeTable
            name={"카페이름"}
            location={"위치"}
            imgae={""}
            information={"--카페정보--"}
            navigation={navigation}
          />
          <CafeTable
            name={"카페이름"}
            location={"위치"}
            imgae={""}
            information={"--카페정보--"}
            navigation={navigation}
          />
          <CafeTable
            name={"카페이름"}
            location={"위치"}
            imgae={""}
            information={"--카페정보--"}
            navigation={navigation}
          />
          <CafeTable
            name={"카페이름"}
            location={"위치"}
            imgae={""}
            information={"--카페정보--"}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const FindStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  contentContainer: {
    flex: 4,
    backgroundColor: "#fff",
  },
});

function CafeTable(props) {
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);

  return (
    <TouchableHighlight
      style={CafeTableStyles.container}
      onPress={() => props.navigation.navigate("Information")}
      activeOpacity={0.5}
      underlayColor="#DDDDDD"
    >
      <>
        <View style={CafeTableStyles.imageContainer}>
          <View style={CafeTableStyles.image}>
            <Image />
            {/*이지지 삽입*/}
          </View>
        </View>
        <View style={CafeTableStyles.contentContainer}>
          <View style={CafeTableStyles.textContent}>
            <Text style={CafeTableStyles.nameText}>{cafeName}</Text>
            <Text style={CafeTableStyles.contentText}>{cafeLocation}</Text>
            <Text style={CafeTableStyles.contentText}>{cafeInformation}</Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

const CafeTableStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  textContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 15,
  },

  textContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
  },
  contentText: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default FindScreen;
