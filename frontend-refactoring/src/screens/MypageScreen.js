import React, { useState, useEffect, useContext } from "react";
import { Image, TouchableOpacity, View, Text, KeyboardAvoidingView,} from "react-native";
import getMyPageStyle from "../styles/screens/MyPageStyle";
import UserService from "../services/UserService"
import { AuthContext } from '@api/AuthContext';


function MyPageScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await loadUserData()
    });
    return unsubscribe;
  }, [navigation, setUserData]);

  /*유저 데이터 가져오기*/
  const loadUserData = async () => {
    await UserService.getUser(user.id).then((data)=>{
      setUserData(data);
    }).catch((error)=>{
       console.log("사용자 불러오기 실패 : ", error);
    })
  };

  useEffect(() => {
    getData();
  }, [userData]);

  const getData = async () => {
    if (userData != null) {
      console.log("새로고침");
      setUserName(userData.name);
      setUserEmail(userData.email);
      const imgs = ""
      if (imgs == "" || imgs == null ) {
        setUserImage(require("@img/initialProfile.jpg"));
      } else {
        setUserImage({ uri: imgs });
      }
    }
  };

  //옵션
  function GoToOptionScreen() {
    navigation.navigate("Option", {
      userData: userData,
    });
  }

  //북마크
  function GoToMyMOAScreen() {
    console.log("데이터", userData);
    navigation.navigate("Bookmark", {
      userData: userData,
    });
  }

  // 리뷰
  function GoToMyReviewScreen() {
    console.log("데이터", userData);
    navigation.navigate("MyReview", {
      userData: userData,
    });
  }

  //테스트 중
  function GoToEditProfileScreen() {
    navigation.navigate("EditProfile", {
      userData: userData,
    });
  }

  //로그아웃
  function GoToLogoutScreen() {
    navigation.replace("Auth");
  }

  //유저 삭제
  function GoToDeleteAccountScreen() {
    navigation.navigate("MemberWithdrawn");
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
            style={getMyPageStyle.infoButton}
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
            My 리뷰
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
