import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

function RegisterScreen({navigation}) {

  const [UserId,setUserId] = useState("");
  const [userPassword,setUserPassword] = useState("");
  const [userEmail,setUserEmail] = useState("");

  function GoToRgisterScreen(){
    navigation.navigate('Register')
  }
  function GoToHomeScreen(){
    navigation.navigate('InApp')
  } 
 
  return (
  <KeyboardAvoidingView style={styles.container} >
    <View style={{flex: 1}}></View>
    <View style={styles.contentArea}>
      <View style={styles.titleText}><Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text></View>
      <View style={styles.subTitleText}><Text style={{ fontWeight: "600", fontSize: 30 }}> Sing Up </Text></View>

      <View style={styles.formArea}>
        <TextInput style={styles.textBox} placeholder={'아이디'}></TextInput>
        <TextInput style={styles.textBox} placeholder={'이메일'}></TextInput>
        <TextInput style={styles.textBox} placeholder={'비밀번호'}></TextInput>
        <TextInput style={styles.textBox} placeholder={'비밀번호 재확인'}></TextInput>
      </View>
      {/* 테스트
      <TextInput
          style={styles.textBox}
          placeholder={'아이디'}
          onChangeText={(userId) => setUserId(userId)}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        */}

      

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btnLogin} onPress = {GoToHomeScreen}>
          <Text style={{ color: 'white', fontSize: 20,}}>회원가입</Text>
        </TouchableOpacity>
      </View>

    </View>
    <View style={{flex: 1}}></View>
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
textBox: {
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

export default RegisterScreen;
