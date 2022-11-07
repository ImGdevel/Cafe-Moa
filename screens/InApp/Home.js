import React, { useState, useEffect } from "react";
import {
  View, Text, Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import getHomeStyle from "../../styles/screens/HomeStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import { getCafeData } from "../../lib/CafeService";
import { UserDataService } from "../../lib/UserDataService";

function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState();
  const [reserveCafeInfo, setReserveCafeInfo] = useState();
  const [page, setPage] = useState(NoneReserve);

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
    //console.log("?")
    //getCafeDatabase3();
  }
     
  /** 예약 내역 로드 */
  useEffect(() => {
    updateConfirmReservation();
  }, [userData]);

  const updateConfirmReservation = async () => {
    if (userData != null && userData.reservation.cafeId != null) {
      setReserveCafeInfo(await getCafeData(userData.reservation.cafeId));
    } else {
      setReserveCafeInfo(null);
    }
  };

  /** 예약 화면 */
  useEffect(()=>{ 
    reserveRefresh()
  },[reserveCafeInfo])

  function reserveRefresh() {
    if (userData != null && reserveCafeInfo != null) {
      setPage(ReservationsHistory);
    } else {
      setPage(NoneReserve);
    }
  }

  const NoneReserve = () => {
    return (
      <>
        <Text style={{ position: "absolute", alignSelf: "center", fontSize: 25 }}>
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
              source={(reserveCafeInfo!=null)?{uri: reserveCafeInfo.getLogo()}:{}}
              style={getHomeStyle.image}
            />
          </View>
          <View>
            <Text style={getCafeTableStyle.ConfirmBoxInText}>
              {(reserveCafeInfo!=null)?reserveCafeInfo.getName():""}
            </Text>
            <Text style={getCafeTableStyle.ConfirmBoxInText}>
              {(reserveCafeInfo!=null)?userData.reservation.seatNumber:""} 번 좌석
            </Text>
            <Text style={getCafeTableStyle.ConfirmBoxInText}>
              {(reserveCafeInfo!=null)?userData.reservation.time:""}:00
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