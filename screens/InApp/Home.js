import React, { useState, useEffect, useTransition } from "react";
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

function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState();
  const [reserveInfo, setReserveInfo] = useState();
  const [reserveCafeInfo, setReserveCafeInfo] = useState();
  const [reserveLoading, setReserveLoading] = useState(false); //카페데이터를 불러오는 도중 사용할 로딩

  useEffect(() => {
    LoadHomePage();
  }, [setUserData]);

  const LoadHomePage = async () => {
    if (userData == null) {
      await getUserProfile()
        .then(async (data) => {
          setUserData(data);
          if (data != null && data.reservation.cafeId != null) {
            let reserve_cafe = await getCafeData(data.reservation.cafeId);
            console.log(reserve_cafe);
            setReserveCafeInfo(reserve_cafe);
            setReserveLoading(true);
          }
        })
        .catch((err) => {
          console.log("잘못된 접근입니다.", err);
          //navigation.replace("Auth"); //로그인 가능하면 풀어도 됩니다.
        });
    }
    let location = await getGeoLocation();
    let cafe = await getCafeDatabaseAd();
  };

  const ReservationsHistory = () => {
    const onConfirmReservation = () => {
      if (reserveCafeInfo != null) {
        navigation.navigate("ConfirmReservation", {
          cafeData: reserveCafeInfo,
          userData: userData,
        });
      }
    };
    const confirmReservationUI = (
      <>
        <View style={getHomeStyle.infoContentContainer}>
          <View style={getCafeTableStyle.imageContainer}>
            <Image
              source={reserveLoading ? { uri: reserveCafeInfo.getLogo() } : {}}
              style={getHomeStyle.image}
            />
          </View>
          <View>
            <Text
              style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
            >
              {reserveLoading ? userData.Name : ""}
            </Text>
            <Text
              style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
            >
              {reserveLoading ? reserveCafeInfo.getName() : ""}
            </Text>
            <Text
              style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
            >
              {reserveLoading ? userData.reservation.seatNumber : ""}번 좌석
            </Text>
            <Text
              style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
            >
              {reserveLoading ? userData.reservation.time : ""}시
            </Text>
            <TouchableOpacity onPress={onConfirmReservation}>
              <Text
                style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
              >
                {"\n\t\t\t\t\t\t"}▶ 내역 확인하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
    if (reserveCafeInfo == null) {
      return (
        <>
          <Text> 예약 내역이 없습니다</Text>
        </>
      );
    } else {
      return confirmReservationUI;
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
              style={{ color: "white", fontSize: 30, marginHorizontal: 10 }}
            >
              {" "}
              예약내역{" "}
            </Text>
          </View>
          <ReservationsHistory />
        </View>

        {/*___
        <TouchableOpacity
          style={getHomeStyle.btnNearbyCafe}
          onPress={() => navigation.navigate("Find")}
        >
          <Text style={{ color: "black", fontSize: 45 }}>주변카페</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getHomeStyle.btnMyPage}
          onPress={() => navigation.navigate("MyPage")}
        >
          <Text style={{ color: "black", fontSize: 45 }}>마이 페이지</Text>
        </TouchableOpacity>
         ___*/}
      </View>
    </KeyboardAvoidingView>
  );
}

export default HomeScreen;
