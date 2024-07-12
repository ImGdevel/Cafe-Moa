import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';

const LogInScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const onSubmit = () => {
    // 로그인 기능 구현
  };

  const GoToRegisterScreen = () => {
    // 회원가입 페이지로 이동
    navigation.navigate('Register');
  };

  const GoToBusinessLogIn = () => {
    // 사업자 로그인 페이지로 이동
    navigation.navigate('BusinessLogin');
  };

  const touchProps = {
    activeOpacity: 1,
    underlayColor: "#A0A0FF",
    style: styles.btnNormal,
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flex: 3 }}></View>
      <View style={styles.contentArea}>
        <View style={styles.titleText}>
          <Text style={{ color: "#001D44", fontWeight: "900", fontSize: 55 }}> M O A </Text>
        </View>
        <View style={styles.subTitleText}>
          <Text style={{ color: "#001D44", fontWeight: "600", fontSize: 30 }}> Login </Text>
        </View>
        <View style={styles.formArea}>
          <TextInput
            ref={idInputRef}
            style={styles.textInput}
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
            style={styles.textInput}
            placeholder={"비밀번호"}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        {errorText ? <Text>{errorText}</Text> : null}
        <View style={styles.btnArea}>
          <TouchableHighlight {...touchProps} onPress={onSubmit}>
            <Text style={styles.btnText}>로그인</Text>
          </TouchableHighlight>
          <TouchableOpacity style={styles.btnRegister} onPress={GoToRegisterScreen}>
            <Text style={styles.btnRegisterText}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegister} onPress={GoToBusinessLogIn}>
            <Text style={styles.btnRegisterText}>사업자 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 4 }}></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  contentArea: {
    width: "90%",
    height: 500,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titleText: {
    marginTop: 0,
    marginBottom: 10,
  },
  subTitleText: {
    alignSelf: "baseline",
    marginLeft: "5%",
  },
  formArea: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  btnArea: {
    width: "75%",
    height: 100,
  },
  btnNormal: {
    margin: 5,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001D44",
    borderRadius: 5,
  },
  btnPress: {
    margin: 5,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A0A0FF",
    borderRadius: 5,
  },
  btnRegister: {
    margin: 5,
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  textInput: {
    marginVertical: 5,
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 20,
  },
});

export default LogInScreen;
