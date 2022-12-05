import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";

import getMyPageStyle from "../../styles/screens/MyPageStyle";
import { signOut } from "../../lib/AuthService";
import { UserDataService } from "../../lib/UserDataService";

function MyPageScreen({ navigation }) {
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState(
    require("../../img/initialProfile.jpg")
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      LoadHomePage();
    });
    return unsubscribe;
  }, [navigation, setUserData]);

  /** 유저 데이터 가져오기 */
  const LoadHomePage = async () => {
    let user = new UserDataService();
    await user.getUserProfile();
    setUserData(user);
  };

  useEffect(() => {
    getData();
  }, [userData]);

  const getData = async () => {
    if (userData != null) {
      console.log("새로고침");
      setUserName(userData.getName());
      setUserEmail(userData.getEmail());
      setUserImage({ uri: await userData.getProfileImage() });
    }
  };

  //옵션
  function GoToOptionScreen() {
    navigation.navigate("옵션", {
      userData: userData,
    });
  }

  //북마크
  function GoToMyMOAScreen() {
    console.log("데이터", userData);
    navigation.navigate("북마크", {
      userData: userData,
    });
  }

  // 리뷰
  function GoToMyReviewScreen() {
    console.log("데이터", userData);
    navigation.navigate("My Review", {
      userData: userData,
    });
  }

  //테스트 중
  function GoToEditProfileScreen() {
    navigation.navigate("개인정보수정", {
      userData: userData,
    });
  }

  //로그아웃
  function GoToLogoutScreen() {
    signOut();
    navigation.replace("Auth");
  }

  //유저 삭제
  function GoToDeleteAccountScreen() {
    navigation.navigate("DeleteUser");
  }

  return (
    <KeyboardAvoidingView style={getMyPageStyle.container}>
      <View style={getMyPageStyle.upContentContainer}>
        <View style={getMyPageStyle.profilePicture}>
          <Image
            style={{ width: "100%", height: "100%", borderRadius: 50 }}
            source={userImage}
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
        <TouchableOpacity style={getMyPageStyle.btn} onPress={GoToMyMOAScreen}>
          <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
            My 모아
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getMyPageStyle.btn}
          onPress={GoToMyReviewScreen}
        >
          <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
            My Review
          </Text>
        </TouchableOpacity>

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
