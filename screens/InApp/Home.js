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
  const [page, setPage] = useState(NoneReserve);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) LoadHomePage();
  }, [isFocused]);

  const LoadHomePage = async () => {
    await getUserProfile()
      .then((data) => {
        setUserData(data);
        console.log("현재 로그인 [", data.Name, "]");
        console.log(data);
        console.log(userData);
        updateConfirmReservation();
      })
      .catch((err) => {
        console.log("잘못된 접근입니다.", err);
        signOut();
        navigation.replace("Auth");
      });
    let location = await getGeoLocation();
  };

  const updateConfirmReservation = async () => {
    // console.log(userData.reservation.cafeId);
    if (userData != null && userData.reservation.cafeId != null) {
      let reserve_cafe = await getCafeData(userData.reservation.cafeId);
      console.log("카페 데이터 추출");
      setReserveCafeInfo(reserve_cafe);
      reserveRefresh();
    } else {
      setReserveCafeInfo(null);
      reserveRefresh();
    }
  };

  function reserveRefresh() {
    console.log(reserveCafeInfo, userData);
    if (
      reserveCafeInfo != null &&
      userData != null &&
      userData.reservation.cafeId != null
    ) {
      setPage(ReservationsHistory);
    } else {
      console.log("초기화!");
      setPage(NoneReserve);
    }
  }

  const NoneReserve = () => {
    return (
      <>
        <Text style={{ position: "absolute", alignSelf: "center" }}>
          예약 내역이 없습니다.
        </Text>
      </>
    );
  };

  const ReservationsHistory = () => {
    return (
      <>
        <View style={getHomeStyle.infoContentContainer}>
          <View style={getCafeTableStyle.imageContainer}>
            <Image
              source={{ uri: reserveCafeInfo.getLogo() }}
              style={getHomeStyle.image}
            />
          </View>
          <View>
            <Text style={getCafeTableStyle.ConfirmBoxInText}>
              {reserveCafeInfo.getName()}
            </Text>
            <Text style={getCafeTableStyle.ConfirmBoxInText}>
              {userData.reservation.seatNumber} 번 좌석
            </Text>
            <Text style={getCafeTableStyle.ConfirmBoxInText}>
              {userData.reservation.time}:00
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (reserveCafeInfo != null && userData != null) {
                  navigation.navigate("ConfirmReservation", {
                    cafeData: reserveCafeInfo,
                    userData: userData,
                  });
                }
              }}
            >
              <Text style={getCafeTableStyle.ConfirmBoxInText}>
                {"\n\t\t\t\t\t\t"}▶ 내역 확인하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
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
          {page}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default HomeScreen;
