import React, { useState, createRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SignInUserAccount } from "../../lib/Auth";

import getLoginStyle from "../../styles/screens/LoginStyle";

function LogInScreen({ navigation }) {
  const [UserId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const idInputRef = createRef();
  const passwordInputRef = createRef();

  function GoToRgisterScreen() {
    navigation.navigate("Register");
  }
  function GoToHomeScreen() {
    navigation.replace("InApp");
  }

  function onSubmit() {
    SignInUserAccount(UserId, userPassword)
      .then(() => {
        GoToHomeScreen();
      })
      .catch(() => {});
  }

  return (
    <KeyboardAvoidingView style={getLoginStyle.container}>
      <View style={{ flex: 3 }}></View>
      <View style={getLoginStyle.contentArea}>
        <View style={getLoginStyle.titleText}>
          <Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text>
        </View>
        <View style={getLoginStyle.subTitleText}>
          <Text style={{ fontWeight: "600", fontSize: 30 }}> Login </Text>
        </View>
        <View style={getLoginStyle.formArea}>
          <TextInput
            ref={idInputRef}
            style={getLoginStyle.textInput}
            placeholder={"아이디"}
            onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() =>
              emailInputRef.current && emailInputRef.current.focus()
            }
          />
          <TextInput
            ref={passwordInputRef}
            style={getLoginStyle.textInput}
            placeholder={"비밀번호"}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <Text>{errorText}</Text>
        <View style={getLoginStyle.btnArea}>
          <TouchableOpacity style={getLoginStyle.btnLogin} onPress={onSubmit}>
            <Text style={{ color: "white", fontSize: 20 }}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getLoginStyle.btnRegister}
            onPress={GoToRgisterScreen}
          >
            <Text style={{ color: "black", fontSize: 20 }}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getLoginStyle.btnRegister}
            onPress={GoToHomeScreen}
          >
            <Text style={{ color: "black", fontSize: 20 }}>
              관리자 권한 입장
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 4 }}></View>
    </KeyboardAvoidingView>
  );
}

export default LogInScreen;
