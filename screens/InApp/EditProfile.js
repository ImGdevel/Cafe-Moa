import React, { useState, useEffect, createRef } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import getEditProfileStyle from "../../styles/screens/EditProfileStyle";

function EditProfileScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [image, setImage] = useState();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const pwInputRef = createRef();

  useEffect(() => {
    start();
    PermissionLib();
  }, []);

  function start() {
    const getimage = userData.getProfileImage();
    if (getimage == null) setImage(require("../../img/initialProfile.jpg"));
    else setImage(getimage);
  }

  const PermissionLib = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission Denied.");
      }
    }
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function handleChange(event) {
    const { text, type, value } = event;
    if (text == "") {
      {
        /*여기서부터 작업 시작*/
      }
    }
  }

  function ConfirmEditProfile() {
    navigation.navigate("마이페이지");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={getEditProfileStyle.container}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <TouchableOpacity
            style={getEditProfileStyle.ProfilePicBtn}
            onPress={PickImage}
          >
            <Image style={{ width: 180, height: 180 }} source={image}></Image>
          </TouchableOpacity>
          <View style={getEditProfileStyle.InputField}>
            <View style={getEditProfileStyle.ChangeBtn}>
              <Text style={getEditProfileStyle.FieldText}>닉네임</Text>
              <TextInput
                ref={nameInputRef}
                style={getEditProfileStyle.textInput}
                placeholder={"닉네임"}
                onChangeText={(text) => {
                  setNickname(text);
                }}
                autoCapitalize="none"
                blurOnSubmit={false}
                returnKeyType="next"
              />
            </View>
            <View style={getEditProfileStyle.ChangeBtn}>
              <Text style={getEditProfileStyle.FieldText}>이메일</Text>
              <TextInput
                ref={emailInputRef}
                style={getEditProfileStyle.textInput}
                placeholder={"이메일"}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                autoCapitalize="none"
                blurOnSubmit={false}
                returnKeyType="next"
              />
            </View>
            <View style={getEditProfileStyle.ChangeBtn}>
              <Text style={getEditProfileStyle.FieldText}>비밀번호</Text>
              <TextInput
                ref={pwInputRef}
                style={getEditProfileStyle.textInput}
                placeholder={"비밀번호"}
                onChangeText={(text) => {
                  setPasswd(text);
                }}
                secureTextEntry={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={getEditProfileStyle.confirmContainer}>
            <TouchableOpacity
              style={getEditProfileStyle.confirmEditBtn}
              onPress={ConfirmEditProfile}
            >
              <Text
                style={{ color: "white", fontSize: 20, alignSelf: "center" }}
              >
                개인정보 수정하기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default EditProfileScreen;
