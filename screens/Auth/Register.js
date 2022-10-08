import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { CreateUserAccount } from '../../lib/Auth';

function RegisterScreen({navigation}) {
  const [userId,setUserId] = useState("");
  const [userEmail,setUserEmail] = useState("");
  const [userPassword,setUserPassword] = useState("");
  const [userPasswordChk,setUserPasswordChk] = useState("");
  const [errorText, setErrorText] = useState("");
  
  const idInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordChkInputRef = createRef();
  
  function GoToHomeScreen(){
    navigation.navigate('InPutData')
  }
  
  function onSubmitApplication(){
    
    setErrorText('');
    if (!userId) {
      setErrorText('아이디를 입력해주세요');
      return;
    }
    if (!userEmail) {
      setErrorText('이메일을 입력해주세요');
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
    
    CreateUserAccount(userEmail,userPassword)
    .then(()=>{
      GoToHomeScreen()
    })
    .catch({
      
    });
  }
  
 
  return (
  <KeyboardAvoidingView style={styles.container} >
    <View style={{flex: 3}}></View>
    <View style={styles.contentArea}>
      <View style={styles.titleText}><Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text></View>
      <View style={styles.subTitleText}><Text style={{ fontWeight: "600", fontSize: 30 }}> Sing Up </Text></View>
      <View style={styles.formArea}>
        <TextInput
          ref={idInputRef}
          style={styles.textInput}
          placeholder={'아이디'}
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
          style={styles.textInput}
          placeholder={'이메일'}
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
          placeholder={'비밀번호'}
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
          placeholder={'비밀번호 확인'}
          onChangeText={(userPasswordChk) => setUserPasswordChk(userPasswordChk)}
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <Text style={styles.errorText}>{errorText}</Text>
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity 
          style={styles.btnLogin} 
          onPress = {onSubmitApplication}
        >
          <Text style={{ color: 'white', fontSize: 20,}}> 회원가입 </Text>
        </TouchableOpacity>
      </View>

    </View>
    <View style={{flex: 4}}></View>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#fff',
  alignItems: 'center',
},
contentArea: {
  width: '90%',
  height: 560,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "#fff",
},
titleText: {
  marginTop: 0,

},
subTitleText: {
  paddingRight: 200,
},

formArea: {
  marginVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
  width: '90%',
},
btnArea: {
  width: '75%',
  height: 100,
},
btnLogin: {
  margin: 5,
  width: '100%',
  height: 60,
  borderRadius: 7,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#111111',
},
btnRegister: {
  margin: 5,
  width: '100%',
  height: 60,
  borderRadius: 7,
  borderWidth: 3,
  borderColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
btnText:{
  color: 'white',
  fontSize: 20,
},
textInput: {
  marginVertical: 5,
  width: '100%',
  height: 60,
  borderWidth: 2,
  borderColor: 'black',
  borderRadius: 10,
  paddingHorizontal: 20,
  backgroundColor: '#fff',
  fontSize: 20,
},
errorText:{
  color: 'red',
  fontSize: 15,
  fontWeight: '400',
}
});

export default RegisterScreen;
