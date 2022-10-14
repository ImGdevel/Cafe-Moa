import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { SignInUserAccount } from '../../lib/Auth';

function LogInScreen({navigation}) {
  const [UserId,setUserId] = useState("");
  const [userPassword,setUserPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const idInputRef = createRef();
  const passwordInputRef = createRef();

    function GoToRgisterScreen(){
      navigation.navigate('Register')
    }
    function GoToHomeScreen(){
      navigation.replace('InApp')
    }

    function onSubmit(){
      SignInUserAccount(UserId,userPassword).then(()=>{
        GoToHomeScreen()
      }).catch(()=>{})
    }
    
  return (
    <KeyboardAvoidingView style={styles.container} >
      <View style={{flex: 3}}></View>
      <View style={styles.contentArea}>
        <View style={styles.titleText}><Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text></View>
        <View style={styles.subTitleText}><Text style={{ fontWeight: "600", fontSize: 30 }}> Login </Text></View>
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
          }/>
          <TextInput
             ref={passwordInputRef}
             style={styles.textInput}
             placeholder={'비밀번호'}
             onChangeText={(userPassword) => setUserPassword(userPassword)}
             secureTextEntry={true}
             autoCapitalize="none"
          /> 
        </View> 
        <Text>{errorText}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btnLogin} onPress = {onSubmit}>
            <Text style={{ color: 'white', fontSize: 20,}}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegister} onPress = {GoToRgisterScreen}>
            <Text style={{ color: 'black', fontSize: 20, }}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegister} onPress = {GoToHomeScreen}>
            <Text style={{ color: 'black', fontSize: 20, }}>관리자 권한 입장</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegister} onPress = {()=>{ navigation.replace('InPutData')}}>
            <Text style={{ color: 'black', fontSize: 20, }}>데이터 관리</Text>
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
    height: 500,
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
  }
});
export default LogInScreen;