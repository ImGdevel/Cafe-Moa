import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import { getCafeData, getCafeDatas } from "../../lib/CafeService";
import { UserDataService } from "../../lib/UserDataService";
import { CafeTable } from "../../Components/CafeTable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Updated } from "../../lib/TestSample";
import { dbService } from "../../FireServer";

function HomeScreen({ navigation, route }) {
  const [userData, setUserData] = useState();
  const [reserveCafeInfo, setReserveCafeInfo] = useState();
  const [bookMarkList, setBookMarkList] = useState();
  const [isBookMark, setIsBookMark] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      LoadHomePage();
    });
    return unsubscribe;
  }, [navigation, setUserData]);

  useEffect(() => {}, []);

  /** 유저 데이터 가져오기 */
  const LoadHomePage = async () => {
    let user = new UserDataService();
    await user.loadUserId();
    await user.getUserProfile();

    setUserData(user);
    refresBookMark();
  };

  /** 예약 내역 로드 */
  useEffect(() => {
    updateConfirmReservation();
    refresBookMark();
  }, [userData]);

  const updateConfirmReservation = async () => {
    if (userData != null && userData.reservation.cafeId != null) {
      setReserveCafeInfo(await getCafeData(userData.reservation.cafeId));
    } else {
      setReserveCafeInfo(null);
    }
  };

  /** Bookmark 리스트 */
  async function refresBookMark() {
    console.log("리로드");
    if (userData == null) return;
    if (userData.bookmark != null) {
      let cafeList = new Array();
      let Mark = await getCafeDatas(userData.bookmark);
      Mark.sort((a, b) => {
        return a.rating < b.rating;
      });
      for (let i = 0; i < Mark.length; i++) {
        cafeList.push(
          <BookMarkPanel
            key={Mark[i].getId()}
            cafeData={Mark[i]}
            userData={userData}
            navigation={navigation}
          />
        );
      }
      if (cafeList.length == 0) {
        console.log(cafeList.length);
        setIsBookMark(false);
      } else {
        console.log(cafeList.length);
        setIsBookMark(true);
      }
      setBookMarkList(cafeList);
    } else if (true) {
      console.log("false");
      setIsBookMark(false);
      setBookMarkList();
    }
  }

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style={getHomeStyle.TopView}>
        <View style={getHomeStyle.TopViewTop}></View>
        <View style={getHomeStyle.TopTitle}>
          <Text style={{ color: "#001D44", fontWeight: "900", fontSize: 60 }}>
            {" "}
            M O A{" "}
          </Text>
        </View>
        <View style={getHomeStyle.TopViewBottom}></View>
      </View>

      <View style={getHomeStyle.MainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/**현제 예약 중인 카페*/}
          <ReservationView
            cafeData={reserveCafeInfo}
            userData={userData}
            navigation={navigation}
          />

          {/**자주가는 카페*/}
          <View style={getHomeStyle.BookMarkArea}>
            <View style={{ height: 50, flexDirection: "row" }}>
              <Text style={getHomeStyle.AreaTitle}> My 모아 </Text>
              {/*<Text style={getHomeStyle.AreaTitleLink}> 전체보기 {">"} </Text>*/}
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
                paddingHorizontal: 4,
              }}
            >
              {bookMarkList}
              {!isBookMark && (
                <Text
                  style={{ alignSelf: "center", fontSize: 20, paddingLeft: 20 }}
                >
                  등록된 My 카페가 없습니다
                </Text>
              )}
            </ScrollView>
          </View>

          {/** 광고  */}
          <View style={getHomeStyle.AdArea}>
            <Text style={getHomeStyle.AreaTitle}> Ad </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <AdPanel img={require("../../img/Advertisement/Ad1.png")} />
              <AdPanel img={require("../../img/Advertisement/Ad2.png")} />
              <AdPanel img={require("../../img/Advertisement/Ad3.png")} />
              <AdPanel img={require("../../img/Advertisement/Ad4.png")} />
              <AdPanel img={require("../../img/Advertisement/Ad5.png")} />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/** 북마크 패널  */
function BookMarkPanel(props) {
  const { cafeData: cafeData, userData: userData } = props;
  const [cafeName, setCafeName] = useState();
  const [cafeLocation, setCafeLocation] = useState();
  const [rating, setRating] = useState();
  useEffect(() => {
    if (cafeData != null) {
      setCafeName(cafeData.getName());
      setCafeLocation(cafeData.getAdress(1, 3));
      if (rating == null) {
        setRating(cafeData.getRating());
      } else {
        dbService
          .collection("CafeData")
          .doc(cafeData.getId())
          .onSnapshot((data) => {
            const rate = data.data().rating;
            setRating(rate);
          });
      }
    }
  }, [cafeData]);

  return (
    <TouchableOpacity
      style={getHomeStyle.BookMarkContainer}
      onPress={() =>
        props.navigation.navigate("카페 정보", {
          cafeData: cafeData,
          userData: userData,
        })
      }
    >
      <View style={getHomeStyle.BookMarkPanelImageArea}>
        <Image
          resizeMode="contain"
          source={{ uri: cafeData.getLogo() }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={getHomeStyle.BookMarkPanelTextArea}>
        <View style={getHomeStyle.BookMarkPanelTextAreaTop}>
          <Text
            style={{
              flex: 2,
              paddingLeft: "4%",
              fontSize: 17,
              fontWeight: "700",
            }}
          >
            {cafeName}
          </Text>
          <Text style={{ flex: 1 }}>
            <Ionicons name="star" style={{ color: "gold" }}></Ionicons> {rating}
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Text style={{ paddingLeft: "3%", color: "#aaa", fontSize: 12 }}>
            {cafeLocation}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/** 예약 내역 */
function ReservationView(props) {
  const {
    cafeData: cafeData,
    userData: userData,
    navigation: navigation,
  } = props;

  if (cafeData == null) {
    return <></>;
  }
  return (
    <View style={getHomeStyle.reserveArea}>
      <View style={getHomeStyle.reserveAreaTop}>
        <Text style={getHomeStyle.AreaTitle}> 현재 예약 내역 </Text>
      </View>
      <View style={getHomeStyle.reserveAreaContent}>
        <View style={getHomeStyle.reserveCafeContainer}>
          <CafeTable
            cafeData={cafeData}
            userData={userData}
            navigation={navigation}
          />
        </View>
        <View style={getHomeStyle.reserveBtnContainer}>
          <TouchableOpacity
            style={getHomeStyle.reserveBtn}
            onPress={() =>
              props.navigation.navigate("ConfirmReservation", {
                cafeData: cafeData,
                userData: userData,
              })
            }
          >
            <Text style={getHomeStyle.reserveBtnText}> 예약 내역 확인 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getHomeStyle.reserveBtn}
            onPress={() =>
              props.navigation.navigate("카페 정보", {
                cafeData: cafeData,
                userData: userData,
              })
            }
          >
            <Text style={getHomeStyle.reserveBtnText}> 카페 정보 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/** 광고 패널 */
function AdPanel({ img }) {
  return (
    <View style={getHomeStyle.AdPanel}>
      <Image
        style={{
          resizeMode: "contain",
          width: "101%",
          height: "101%",
          borderRadius: 10,
        }}
        source={img}
      />
    </View>
  );
}

export default HomeScreen;
