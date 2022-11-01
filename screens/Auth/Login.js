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

function LogInScreen({ navigation }) {
  const [UserId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const idInputRef = createRef();
  const passwordInputRef = createRef();

  useEffect(()=>{
    isLogin()
  },[])

  async function isLogin(){
    
    let id = await getCurrentUserId();
    if(id != null){
      console.log("지동 로그인...", id);
      GoToHomeScreen();
    }
    
  }

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
      .catch(() => {

      });
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
          <Text style={{ fontWeight: "900", fontSize: 55 }}> M O A </Text>
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
          <TouchableHighlight 
            {...touchProps}
            onPress={onSubmit}
          >
            <Text style={{ color: "white", fontSize: 23 }}>로그인</Text>
          </TouchableHighlight>

          <TouchableOpacity
            style={getLoginStyle.btnRegister}
            onPress={GoToRgisterScreen}
          >
            <Text style={{ color: "#bbb", fontSize: 20 }}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 4 }}></View>
    </KeyboardAvoidingView>
  );
}

export default LogInScreen;
