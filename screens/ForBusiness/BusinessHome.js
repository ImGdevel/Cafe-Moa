import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import getBusinessHomeStyle from "../../styles/screens/BusinessHomeStyle";
import getInfoStyle from "../../styles/screens/InfoStyle";

function BusinessHomeScreen({ navigation }) {
  const [cafeData, setCafeData] = useState();
  
  function GoToLogoutScreen() {
    // signOut();
    navigation.replace("Auth");
  }



  

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style={getHomeStyle.TopView}>
        <View style={getHomeStyle.TopViewTop}></View>
        <View style={getHomeStyle.TopTitle}>
          <Text style={{ color: "#001D44", fontWeight: "900", fontSize: 60 }}>
            M O A
          </Text>
          <Text
            style={{
              color: "#001D44",
              alignSelf: "flex-end",
              paddingRight: "28%",
              top: -10,
            }}
          >
            for Business
          </Text>
        </View>
      </View>
      <View style={getBusinessHomeStyle.contentContainer}>
        <View style={getBusinessHomeStyle.btnContainer}>
          <TouchableOpacity style={getBusinessHomeStyle.button}>
            <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
              예약 관리
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getBusinessHomeStyle.button}
            onPress={() => {
              navigation.navigate("카페정보-사업자용");
            }}
          >
            <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
              카페 정보
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getBusinessHomeStyle.button}
            onPress={() => {
              navigation.navigate("좌석 및 예약 관리");
            }}
          >
            <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
              좌석 및 예약 관리
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={getBusinessHomeStyle.button}>
            <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
              카페 정보
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={getBusinessHomeStyle.manageReservationWindow}>
          <View style={getBusinessHomeStyle.manageHeader}>
            <Text style={{ color: "black", fontWeight: "500", fontSize: 30 }}>
              현재 좌석 현황
            </Text>
          </View>
          <View style={getBusinessHomeStyle.seatPicArea}>
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={require("../../img/anySeatPic_text.png")}
            />
          </View>
          <View style={getBusinessHomeStyle.reservationListContainer}>
            <View style={getBusinessHomeStyle.reservationList}>
              <TouchableOpacity
                style={getBusinessHomeStyle.reserveTimeBox}
                onPress={() => {
                  Alert.alert("", "좌석을 사용완료합니다.", [
                    {
                      text: "취소",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "완료",
                      onPress: () => console.log("OK Pressed"),
                    },
                  ]);
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "500", fontSize: 15 }}
                >
                  7
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={getBusinessHomeStyle.logoutContainer}>
          <TouchableOpacity
            style={getBusinessHomeStyle.logoutBtn}
            onPress={GoToLogoutScreen}
          >
            <Text style={{ color: "black", fontSize: 21 }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "5%" }}></View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default BusinessHomeScreen;
