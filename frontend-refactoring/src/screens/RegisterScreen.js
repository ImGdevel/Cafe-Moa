import React, { useRef, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableHighlight, KeyboardAvoidingView, StyleSheet, Switch } from 'react-native';
import { createUserWithEmailAndPassword } from '@services/AuthService'; // AuthService에서 회원가입 함수 가져오기
import { AuthContext } from '@api/AuthContext';
import UserService from '../services/UserService';

const RegisterScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordChk, setUserPasswordChk] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [errorText, setErrorText] = useState('');

  const idInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passwordChkInputRef = useRef(null);

  // Step 1: Firebase 사용자 생성 함수
  const createUser = async () => {
    try {
      const userId = await createUserWithEmailAndPassword(userEmail, userPassword);
      console.log('User registered with UID:', userId);
      return userId;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  };

  // Step 2: 앱 서비스에 유저 데이터 등록 함수
  const registerUser = async (userId) => {
    try {
      const userDTO = {
        uid: userId,
        name: userName,
        email: userEmail,
        profileImage: "",
        role: "CUSTOMER"
      };
      const user = await UserService.createUser(userDTO);
      return user;
    } catch (error) {
      console.error('Error registering user:', error.message);
      throw error;
    }
  };

  // Step 3: 로그인 처리 함수
  const handleLogin = async (user) => {
    try {
      const sessionData = {
        id: user.id,
        uid: user.uid
      };
      await login(sessionData);
    } catch (error) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  };

  // 사용자 등록 절차 함수
  const onSubmitApplication = async () => {
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

    let userId = null;
    let createdUser = null;

    try {
      // Step 1: Firebase 사용자 생성
      userId = await createUser();

      // Step 2: 앱 서비스에 유저 데이터 등록
      createdUser = await registerUser(userId);

      // Step 3: 로그인 처리
      await handleLogin(createdUser);

      // Step 4: HomeTabs 화면으로 이동
      navigation.navigate('HomeTabs');
    } catch (error) {
      console.error('Error during registration:', error.message);
      setErrorText(error.message);
    }
  };

  const touchProps = {
    activeOpacity: 1,
    underlayColor: "#2C3972",
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
          <Text style={{ color: "#001D44", fontWeight: "600", fontSize: 30 }}> Sign Up </Text>
        </View>
        <View style={styles.formArea}>
          <TextInput
            ref={idInputRef}
            style={styles.textInput}
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
            style={styles.textInput}
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
            style={styles.textInput}
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
            style={styles.textInput}
            placeholder={"비밀번호 확인"}
            onChangeText={(userPasswordChk) =>
              setUserPasswordChk(userPasswordChk)
            }
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>사업자 회원{"\t\t"}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isSelected ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setSelection(!isSelected)}
              value={isSelected}
            />
          </View>
          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
        </View>
        <View style={styles.btnArea}>
          <TouchableHighlight {...touchProps} onPress={onSubmitApplication}>
            <Text style={{ color: "white", fontSize: 23 }}>회원가입</Text>
          </TouchableHighlight>
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
    height: 560,
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
    paddingRight: 200,
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
    height: 63,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001D44",
    borderRadius: 5,
  },
  btnPress: {
    margin: 5,
    width: "100%",
    height: 63,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001D44",
    borderRadius: 5,
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
    borderColor: "gray",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    fontSize: 15,
    fontWeight: "400",
  },
});

export default RegisterScreen;
