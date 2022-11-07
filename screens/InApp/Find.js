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
import { getCafeDatabaseAd } from "../../lib/CafeService";
import { getGeoLocation } from "../../lib/LocationService";
import { UserDataService } from "../../lib/UserDataService";

function FindScreen({ navigation, route }) {
  const [userData, setUserData] = useState();
  const [textInputValue, setTextInputValue] = useState("");
  const [cafeLoop, setCafeLoop] = useState([]);
  const [cafeDatas, setcafeDatas] = useState([]);
  const [location, setLocation] = useState();

  useEffect(() => {
    Start();
    CafeListLoad();
  }, [setCafeLoop]);

  useEffect(() => {
    CafeListLoad();
  }, [cafeDatas]);

  /** 시작 */
  const Start = async () => {
    let user = new UserDataService();
    await user.getUserProfile();
    setUserData(user);

    if (location == null) {
      await getGeoLocation().then(async (loc) => {
        let cafe_data = await getCafeDatabaseAd(location); //확인
        console.log("카페 리스트 불러오는 중...");
        setcafeDatas(cafe_data);
      });
    }
  };

  /** 카페리스트 출력 */
  const CafeListLoad = () => {
    console.log("카페 리스트 출력");
    let cafeList = [];
    for (let i = 0; i < cafeDatas.length; i++) {
      cafeList.push(
        <CafeTable
          key={i}
          cafeData={cafeDatas[i]}
          userData={userData}
          navigation={navigation}
        />
      );
    }
    setCafeLoop(cafeList);
  };

  const search = () => {};
  const filter = () => {};

  return (
    <View style={getFindStyle.container}>
      <View style={{ flex: 0.3, backgroundColor: "#fff" }}>
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
  const { cafeData: cafe_data, userData: user_data } = props;
  const [userData, setUserData] = useState(user_data);
  const [cafeData, setCafeData] = useState(cafe_data);
  const [cafeName, setCafeName] = useState(cafe_data.getName());
  const [cafeLocation, setCafeLocation] = useState(cafe_data.getAdress(1, 3));
  const [cafeInformation, setCafeInformaion] = useState(
    "Open : " +
      cafe_data.getOpenTime() +
      ":00 ~ Close : " +
      cafe_data.getCloseTime() +
      ":00"
  );
  const [cafeLogoImage, setCafeLogoImage] = useState(cafe_data.getLogo());

  return (
    <TouchableHighlight
      style={getCafeTableStyle.container}
      onPress={() =>
        props.navigation.navigate("카페 정보", {
          cafeData: cafeData,
          userData: userData,
        })
      }
      activeOpacity={0.5}
      underlayColor="#DDDDDD"
    >
      <>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={{ uri: cafeLogoImage }}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
            />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
            <View styles={getCafeTableStyle.iconContainer}>
              <Ionicons name="star" style={getCafeTableStyle.icon}></Ionicons>
              <Text>(4.7)</Text>
            </View>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

export default FindScreen;
