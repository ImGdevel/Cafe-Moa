import React, { useRef, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '@api/AuthContext';
import { signInUserWithEmailAndPassword } from '../services/AuthService';
import UserService from '../services/UserService';

const LogInScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const idInputRef = useRef(null);
  const passwordInputRef = useRef(null);


    // Step 1: Firebase 사용자 로그인
    const SginInUser = async () => {
      try {
        const uid = await signInUserWithEmailAndPassword(userId, userPassword);
        return uid;
      } catch (error) {
        console.error('Error Sginin user:', error.message);
        throw error;
      }
    };
  
    // Step 2: 앱 서비스에 유저 데이터 등록 함수
    const GetUserID = async (uid) => {
      try {
        const user = await UserService.getUserByUID(uid);
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



  const onSubmit = async () => {
    try {

      // Step 1: Firebase 아이디와 비밀번호를 사용하여 로그인 시도
      const userId = await SginInUser();

      // Step 2: 앱 서비스에 유저 데이터 가져오기
      const sgininUser = await GetUserID(userId);

      // Step 3: 로그인 처리
      await handleLogin(sgininUser);

      navigation.navigate('HomeTabs');
    } catch (error) {
      console.error('Error signing in:', error.message);
      setErrorText('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const GoToRegisterScreen = () => {
    // 회원가입 페이지로 이동
    navigation.navigate('Register');
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
