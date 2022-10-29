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
import { getUserProfile } from "../../lib/UserDataService";

function MyPageScreen({ navigation }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    let user_data = await getUserProfile();
    setUserData(user_data);
  };

  useEffect(() => {
    getData();
  }, [setUserData]);

  function GoToOptionScreen() {
    //navigation.navigate()
  }

  function GoToEditProfileScreen() {
    //
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
            style={{ width: "100%", height: "100%", BorderRadius: 50 }}
            source={require("../../img/initialProfile.jpg")}
          ></Image>
        </View>
        <View style={getMyPageStyle.idText}>
          <Text style={{ fontWeight: "600", fontSize: 25 }}>
            {userData.Name}
          </Text>
          <Text style={{ fontWeight: "400", fontSize: 15 }}>
            {userData.email}
          </Text>
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
