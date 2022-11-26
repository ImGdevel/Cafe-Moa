import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CafeService } from "../../lib/CafeService";
import { UserDataService } from "../../lib/UserDataService";

const EADASF = "Dadsdaa";


function FindScreen({ navigation, route }) {
  const [userData, setUserData] = useState();
  const [textInputValue, setTextInputValue] = useState("");
  const [cafeTableList, setcafeTableList] = useState([]);
  const [cafeService,setCafeService] = useState(new CafeService());
  const [cafeDatas, setcafeDatas] = useState([]);
  const [sortBy, setSortBy] = useState(SORT_DISTANCE);
  const [loading, setLoading] = useState(false);
  const [SORT_DISTANCE, SORT_RATING,SORT_VISITIORS,SORT_NOW_VISITIORS] = [1,2,3,4];
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async() => {
      LoadHomePage();
    });
    return unsubscribe;
  }, [navigation, setUserData]);

  /** 유저 데이터 가져오기 */
  const LoadHomePage = async () => {
    let user = new UserDataService();
    await user.getUserProfile();
    setUserData(user);
  }

  useEffect(() => {
    FindStart();
    CafeListLoad();
  }, [setcafeTableList]);

  /** 카페 리스트 출력 */
  useEffect(() => {
    CafeListLoad();
  }, [cafeDatas]);

  /** 시작 */
  async function FindStart() {
    /** defalut */
    let cafeservice = new CafeService();
    await cafeservice.getCafeDatabaseAd();
    setCafeService(cafeservice);
    setcafeDatas(cafeservice.getCafeDataListArray());
    
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
    setcafeTableList(cafeList);
  };

  const search = () => {};
  const filter = () => {};

  const sortDistance = () => {
    let sortedData = cafeService.sortCafeData(SORT_DISTANCE);
    setcafeDatas(sortedData);
  };
  const sortRating = () => {
    let sortedData = cafeService.sortCafeData(SORT_RATING);
    setcafeDatas(sortedData);
  };
  const sortVisitor = () => {
    let sortedData = cafeService.sortCafeData(SORT_VISITIORS);
    setcafeDatas(sortedData);
  };
  const sortNowVisitor = () => {
    let sortedData = cafeService.sortCafeData(SORT_NOW_VISITIORS);
    setcafeDatas(sortedData);
  };


  return (
    <View style={getFindStyle.container}>
      <View style={getFindStyle.topContainer}>

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

        <View style={getFindStyle.SortContainer}>
          <TouchableOpacity style={getFindStyle.btnSort} onPress={sortDistance}>
            <Text  style={getFindStyle.btnSortText}> 거리순 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={getFindStyle.btnSort} onPress={sortRating}>
            <Text style={getFindStyle.btnSortText}> 별점순 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={getFindStyle.btnSort} onPress={sortVisitor}>
            <Text style={getFindStyle.btnSortText}> 방문자순 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={getFindStyle.btnSort} onPress={sortDistance}>
            <Text style={getFindStyle.btnSortText}> 예약자순 </Text>
          </TouchableOpacity>
        </View>

        <View style={getFindStyle.filterContainer}>
          <TouchableOpacity style={getFindStyle.btnFilter} onPress={filter}>
            <Ionicons name="filter-outline" style={{ fontSize: 20, color: "#001D44" }}>
              <Text style={{ fontSize: 15, color: "#001D44" }}> 필터</Text>
            </Ionicons>
          </TouchableOpacity>
        </View>

      </View>

      <View style={getFindStyle.contentContainer}>
        <ScrollView>{cafeTableList}</ScrollView>
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
  const [rating, setRating] = useState(cafe_data.getRating());
  

  useEffect(()=>{
    setUserData(user_data);
    setCafeData(cafe_data);
    setCafeName(cafe_data.getName());
    setCafeLocation(cafe_data.getAdress(1, 3));
    setCafeInformaion( "Open : " + cafe_data.getOpenTime() +":00 ~ Close : " +cafe_data.getCloseTime() +":00");
    setCafeLogoImage(cafe_data.getLogo());
    setRating(cafe_data.getRating());
  },[,cafe_data])

  useEffect(()=>{
    setUserData(user_data);
    setCafeData(cafe_data);
    setCafeName(cafe_data.getName());
    setCafeLocation(cafe_data.getAdress(1, 3));
    setCafeInformaion( "Open : " + cafe_data.getOpenTime() +":00 ~ Close : " +cafe_data.getCloseTime() +":00");
    setCafeLogoImage(cafe_data.getLogo());
    setRating(cafe_data.getRating());
  },[,cafe_data])

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
              <Text style={getCafeTableStyle.icon}>
                <Ionicons name="star" style={{ color: "gold" }}></Ionicons>{" "}
                {rating}
              </Text>
            </View>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

export default FindScreen;
