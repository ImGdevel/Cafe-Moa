import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, KeyboardAvoidingView, StyleSheet, Switch } from 'react-native';

const RegisterScreen = ({ navigation }) => {
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

  const onSubmitApplication = () => {
    // 회원가입 기능 구현
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
