import React, { useState, useEffect, createRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { CreateUserAccount } from "../../lib/Auth";

import getRegisterStyle from "../../styles/screens/RegisterStyle";

function RegisterScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordChk, setUserPasswordChk] = useState("");
  const [errorText, setErrorText] = useState("");

  const idInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordChkInputRef = createRef();

  function GoToHomeScreen() {
    navigation.navigate("InPutData");
  }

  function onSubmitApplication() {
    setErrorText("");
    if (!userId) {
      setErrorText("아이디를 입력해주세요");
      return;
    }
    if (!userEmail) {
      setErrorText("이메일을 입력해주세요");
      return;
    }
    if (!userPassword) {
      setErrorText("비밀번호를 입력해주세요");
      return;
    }
    if (userPasswordChk != userPassword) {
      setErrorText("비밀번호가 일치하지 않습니다");
      return;
    }

    CreateUserAccount(userEmail, userPassword)
      .then(() => {
        GoToHomeScreen();
      })
      .catch({});
  }

  const [isPress, setIsPress] = useState(false);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: "#A0A0FF", // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? getRegisterStyle.btnPress : getRegisterStyle.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {
      onSubmitApplication;
    }, // <-- "onPress" is apparently required
  };

  return (
    <KeyboardAvoidingView style={getRegisterStyle.container}>
      <View style={{ flex: 3 }}></View>
      <View style={getRegisterStyle.contentArea}>
        <View style={getRegisterStyle.titleText}>
          <Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text>
        </View>
        <View style={getRegisterStyle.subTitleText}>
          <Text style={{ fontWeight: "600", fontSize: 30 }}> Sing Up </Text>
        </View>
        <View style={getRegisterStyle.formArea}>
          <TextInput
            ref={idInputRef}
            style={getRegisterStyle.textInput}
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
            ref={emailInputRef}
            style={getRegisterStyle.textInput}
            placeholder={"이메일"}
            keyboardType="email-address"
            onChangeText={(userEmail) => setUserEmail(userEmail)}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
          />
          <TextInput
            ref={passwordInputRef}
            style={getRegisterStyle.textInput}
            placeholder={"비밀번호"}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            secureTextEntry={true}
            onSubmitEditing={() =>
              passwordChkInputRef.current && passwordChkInputRef.current.focus()
            }
          />
          <TextInput
            ref={passwordChkInputRef}
            style={getRegisterStyle.textInput}
            placeholder={"비밀번호 확인"}
            onChangeText={(userPasswordChk) =>
              setUserPasswordChk(userPasswordChk)
            }
            autoCapitalize="none"
            secureTextEntry={true}
          />

          <Text style={getRegisterStyle.errorText}>{errorText}</Text>
        </View>
        <View style={getRegisterStyle.btnArea}>
          <TouchableHighlight {...touchProps}>
            <Text style={{ color: "black", fontSize: 20 }}>회원가입</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{ flex: 4 }}></View>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
