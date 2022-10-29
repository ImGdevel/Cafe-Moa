import * as React from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import getHomeStyle from "../../styles/screens/HomeStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";

function HomeScreen({ navigation }) {
  function InfoReservation() {
    //navigation.navigate()
  }
  function NearbyCafe() {
    //navigation.navigate()
  }

  function NearbyCafe() {}

  function ConfirmReservation() {
    //
  }

  function MyPage() {
    // this is for test
  }

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style={getHomeStyle.homeText}>
        <Text style={{ color: "#001D44", fontWeight: "700", fontSize: 65 }}>
          M O A
        </Text>
      </View>

      <View style={getHomeStyle.contentContainer}>
        <TouchableOpacity
          style={getHomeStyle.btnInfoReservation}
          onPress={() => navigation.navigate("ConfirmReservation")}
        >
          <View style={getHomeStyle.infoContainer}>
            <Text
              style={{ color: "white", fontSize: 30, marginHorizontal: 10 }}
            >
              예약내역
            </Text>
          </View>
          <View style={getHomeStyle.infoContentContainer}>
            <View style={getCafeTableStyle.imageContainer}>
              <Image
                source={require("../../img/coffeebayLogo_test.jpg")}
                style={getHomeStyle.image}
              />
            </View>
            <View>
              <Text
                style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
              >
                --카페이름--
              </Text>
              <Text
                style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
              >
                예약시간
              </Text>
              <Text
                style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
              >
                자리
              </Text>
              <Text
                style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}
              >
                {"\n\t\t\t\t\t\t"}▶ 내역 확인하기
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
