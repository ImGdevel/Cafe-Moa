import React, { useState, createRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { getCurrentUserId, SignInUserAccount } from "../../lib/AuthService";
import getLoginStyle from "../../styles/screens/LoginStyle";

function BusinessLogInScreen({ navigation }) {
  const [UserId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const idInputRef = createRef();
  const passwordInputRef = createRef();

  function GoToHomeScreen() {
    navigation.replace("Business");
  }

  function onSubmit() {
    if (!UserId) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (!userPassword) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    SignInUserAccount(UserId, userPassword)
      .then(() => {
        GoToHomeScreen();
      })
      .catch(() => {});
  }

  const [isPress, setIsPress] = useState(false);
  const touchProps = {
    activeOpacity: 1,
    underlayColor: "#2C3972",
    style: isPress ? getLoginStyle.btnPress : getLoginStyle.btnNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {
      onSubmit;
    },
  };

  return (
    <KeyboardAvoidingView style={getLoginStyle.container}>
      <View style={{ flex: 3 }}></View>
      <View style={getLoginStyle.contentArea}>
        <View style={getLoginStyle.titleText}>
          <Text style={{ color: "#001D44", fontWeight: "900", fontSize: 55 }}>
            {" "}
            M O A{" "}
          </Text>
          <Text style={{ color: "#001D44", textAlign: "right" }}>
            for Business
          </Text>
        </View>
        <View style={getLoginStyle.subTitleText}>
          <Text style={{ color: "#001D44", fontWeight: "600", fontSize: 30 }}>
            {" "}
            Login{" "}
          </Text>
        </View>
        <View style={getLoginStyle.formArea}>
          <TextInput
            ref={idInputRef}
            style={getLoginStyle.textInput}
            placeholder={"아이디"}
            onChangeText={(userId) => setUserId(userId.trim())}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
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
          <TouchableHighlight {...touchProps} onPress={onSubmit}>
            <Text style={{ color: "white", fontSize: 23 }}>로그인</Text>
          </TouchableHighlight>

          <TouchableOpacity
            style={getLoginStyle.btnRegister}
            onPress={() => {
              navigation.replace("Auth");
            }}
          >
            <Text style={{ color: "#bbb", fontSize: 20 }}>일반 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 4 }}></View>
    </KeyboardAvoidingView>
  );
}

export default BusinessLogInScreen;
