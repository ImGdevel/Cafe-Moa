import React, { useState, createRef } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { CreateUserAccount } from "../../lib/AuthService";
import { createUserProfile } from "../../lib/UserDataService";

import getRegisterStyle from "../../styles/screens/RegisterStyle";

function RegisterScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordChk, setUserPasswordChk] = useState("");
  const [errorText, setErrorText] = useState("");

  const idInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordChkInputRef = createRef();

  function GoToHomeScreen() {
    navigation.navigate("InApp");
  }

  function onSubmitApplication() {
    setErrorText("");
    if (!userName) {
      setErrorText("이름을 입력해주세요");
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
      .then((id) => {
        createUserProfile(userName, id, userEmail, userPassword);
        GoToHomeScreen();
      })
      .catch((err) => {
        alert("계정 생성에 실패 했습니다.");
      });
  }

  const [isPress, setIsPress] = useState(false);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: "#2C3972",
    style: isPress ? getRegisterStyle.btnPress : getRegisterStyle.btnNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {
      onSubmitApplication
    },
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
            placeholder={"이름"}
            onChangeText={(userName) => setUserName(userName)}
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
            placeholder={"아이디(이메일)"}
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
          <TouchableHighlight {...touchProps} onPress={onSubmitApplication}>
            <Text style={{ color: "white", fontSize: 23 }}>회원가입</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{ flex: 4 }}></View>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
