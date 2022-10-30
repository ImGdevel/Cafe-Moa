import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import { getCafeData, getCafeDatabaseAd } from "../../lib/Database";
import { getUserProfile } from "../../lib/UserDataService";
import { getGeoLocation } from "../../lib/LocationService";
import { sample_CafeData, sample_User } from "../../lib/TestSample";
import { CafeData } from "../../lib/CafeData";
import { signOut } from "../../lib/AuthService";
import { useIsFocused } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState();
  const [reserveCafeInfo, setReserveCafeInfo] = useState();
  const [reserveLoading, setReserveLoading] = useState(false); //카페데이터를 불러오는 도중 사용할 로딩

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      LoadHomePage();
      Test();
    });

    return unsubscribe;
  }, [navigation]);

  function Test() {
    console.log("test");
  }

  useEffect(() => {
    updateConfirmReservation();
  }, [setUserData]);

  const LoadHomePage = async () => {
    await getUserProfile()
      .then(async (data) => {
        setUserData(data);
        console.log("현제 로그인 [", data.Name, "]");
        updateConfirmReservation();
        console.log(data);
      })
      .catch((err) => {
        console.log("잘못된 접근입니다.", err);
        signOut();
        navigation.replace("Auth");
      });

    let location = await getGeoLocation();
  };

  const updateConfirmReservation = async () => {
    if (userData != null && userData.reservation.cafeId != null) {
      let reserve_cafe = await getCafeData(userData.reservation.cafeId);
      console.log(reserve_cafe);
      setReserveCafeInfo(reserve_cafe);
    }else{
    }
  };

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style={getHomeStyle.homeText}>
        <Text style={{ color: "#001D44", fontWeight: "700", fontSize: 65 }}>
          M O A
        </Text>
      </View>

      <View style={getHomeStyle.contentContainer}>
        <View>{/**다른 홈내용 */}</View>
        <View style={getHomeStyle.btnInfoReservation}>
          <View style={getHomeStyle.infoContainer}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                marginHorizontal: 10,
                paddingHorizontal: 20,
              }}
            >
              예약내역
            </Text>
          </View>
          <ReservationsHistory 
            cafeData = {reserveCafeInfo}
            userData = {userData}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function ReservationsHistory(props){
  const {cafeData:cafe_data, userData:user_data} = props;
  const [cafeData, serCafeData] = useState(cafe_data)
  const [userData, serUserData] = useState(user_data)

  return (
    <>
      <View style={getHomeStyle.infoContentContainer}>
        <View style={getCafeTableStyle.imageContainer}>
          <Image
            source={cafeData.getLogo()}
            style={getHomeStyle.image}
          />
        </View>
        <View>
          <Text style={getCafeTableStyle.ConfirmBoxInText}>
            {cafeData.getName()}
          </Text>
          <Text style={getCafeTableStyle.ConfirmBoxInText}>
            {cafeData.reservation.seatNumber} 번 좌석
          </Text>
          <Text style={getCafeTableStyle.ConfirmBoxInText}>
            {cafeData.reservation.time}:00
          </Text>
          <TouchableOpacity onPress={()=>{
                if (reserveCafeInfo != null && userData != null) {
                  navigation.navigate("ConfirmReservation", {
                    cafeData: reserveCafeInfo,
                    userData: userData,
                  });
                }
          }}>
            <Text style={getCafeTableStyle.ConfirmBoxInText}>
              {"\n\t\t\t\t\t\t"}▶ 내역 확인하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
