import * as React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import getHomeStyle from "../../styles/screens/HomeStyle";

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
        <Text style={{ fontWeight: "700", fontSize: 65 }}>CAFE MOA</Text>
      </View>

      <View style={getHomeStyle.contentContainer}>
        <TouchableOpacity
          style={getHomeStyle.btnInfoReservation}
          onPress={() => navigation.navigate("ConfirmReservation")}
        >
          <View style={getHomeStyle.Infocontainer}>
            <Text style={{ color: "black", fontSize: 30, margin: 10 }}>
              예약내역
            </Text>
          </View>
          <Text style={{ color: "#ccc", fontSize: 20, marginHorizontal: 20 }}>
            cafe name :
          </Text>
          <Text style={{ color: "#ccc", fontSize: 20, marginHorizontal: 20 }}>
            time :
          </Text>
          <Text style={{ color: "#ccc", fontSize: 20, marginHorizontal: 20 }}>
            seat :
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getHomeStyle.btnConfirmReservation}
          onPress={() => navigation.navigate("ConfirmReservation")}
        >
          <Text
            style={{ color: "black", fontSize: 22, margin: 15, padding: 4 }}
          >
            ▶자세한 예약정보
          </Text>
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
