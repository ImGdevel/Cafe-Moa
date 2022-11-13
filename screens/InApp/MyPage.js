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
import { signOut } from "../../lib/AuthService";
import { getUserProfile, UserDataService } from "../../lib/UserDataService";

function MyPageScreen({ navigation }) {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let UserId = new UserDataService();
    await UserId.loadUserId();
    let user_data = await UserId.getUserProfile();
    setUserData(user_data);
    setUserName(user_data.Name);
    setUserEmail(user_data.email);
    //

  };

  function GoToOptionScreen() {
    //navigation.navigate()
  }

  //테스트 중
  function GoToEditProfileScreen() {
    // 개인정보 변경 firebase와 연결은 아래 예시처럼 하면 되고
    // 임시로 개인정보변경 누르면 바뀌도록 해놨으니 확인하시고 이해하시면 싹 지워버리시면 됩니당
    // 현재 마이페이지에서는 리로드를 또 해야 변경된 게 보입니다
    let UserId = new UserDataService();
    // await UserId.loadUserId(); //함수 새로 생성하면 필요할 듯?
    UserId.setUserProfile("test33", "test33@naver.com", "123456");
  }

  function GoToLogoutScreen() {
    signOut();
    navigation.replace("Auth");
  }

  function GoToDeleteAccountScreen() {
    //
  }

  return (
    <KeyboardAvoidingView style={getMyPageStyle.container}>
      <View style={getMyPageStyle.upContentContainer}>
        <View style={getMyPageStyle.profilePicture}>
          <Image
            style={{ width: "100%", height: "94%", BorderRadius: 50 }}
            source={require("../../img/initialProfile.jpg")}
          ></Image>
        </View>
        <View style={getMyPageStyle.idText}>
          <Text style={{ fontWeight: "600", fontSize: 25 }}>{userName}</Text>
          <Text style={{ fontWeight: "400", fontSize: 15 }}>{userEmail}</Text>
          <Text></Text>
          <TouchableOpacity
            style={getMyPageStyle.infoBtn}
            onPress={GoToEditProfileScreen}
          >
            <Text style={{ color: "white", fontSize: 20 }}>개인정보변경</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={getMyPageStyle.contentContainer}>
        <TouchableOpacity style={getMyPageStyle.btn} onPress={GoToOptionScreen}>
          <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
            옵션
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={getMyPageStyle.btn} onPress={GoToLogoutScreen}>
          <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
            로그아웃
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getMyPageStyle.btn}
          onPress={GoToDeleteAccountScreen}
        >
          <Text style={{ color: "red", fontWeight: "500", fontSize: 20 }}>
            회원탈퇴
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default MyPageScreen;
