import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import getMyPageStyle from "../../styles/screens/MyPageStyle";

function MyPageScreen({ navigation }) {
  //const [userId, setUserId] = useState(props.userId);

  function GoToOptionScreen() {
    //navigation.navigate()
  }

  function GoToEditProfileScreen() {
    //
  }

  function GoToLogoutScreen() {
    //
  }

  function GoToDeleteAccountScreen() {
    //
  }

  return (
    <KeyboardAvoidingView style={getMyPageStyle.container}>
      <View style={getMyPageStyle.upContentContainer}>
        <View style={getMyPageStyle.profilePicture}>
          <Image
            style={{ width: "100%", height: "100%", BorderRadius: 50 }}
            source={require("../../img/initialProfile.jpg")}
          ></Image>
        </View>
        <View style={getMyPageStyle.idText}>
          <Text style={{ fontWeight: "400", fontSize: 20 }}>성 이름</Text>
          <Text style={{ fontWeight: "400", fontSize: 20 }}>userID</Text>
          <Text></Text>
          <TouchableOpacity
            style={getMyPageStyle.infoBtn}
            onPress={GoToEditProfileScreen}
          >
            <Text style={{ color: "white", fontSize: 20 }}> 개인정보변경</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={getMyPageStyle.contentContainer}>
        <TouchableOpacity style={getMyPageStyle.btn} onPress={GoToOptionScreen}>
          <Text style={{ color: "black", fontSize: 20 }}>옵션</Text>
        </TouchableOpacity>

        <TouchableOpacity style={getMyPageStyle.btn} onPress={GoToLogoutScreen}>
          <Text style={{ color: "black", fontSize: 20 }}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getMyPageStyle.btn}
          onPress={GoToDeleteAccountScreen}
        >
          <Text style={{ color: "red", fontSize: 20 }}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default MyPageScreen;
