import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import { Image, Dimensions, TouchableOpacity, View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

function MyPageScreen({ navigation }) {
  function GoToOptionScreen(){
    //navigation.navigate('#')
  };

  function GoToEditProfileScreen(){
    //
  };

  function GoToLogoutScreen(){
    //
  };

  function GoToDeleteAccountScreen(){
    //
  };


  return (
  <KeyboardAvoidingView style={styles.container}>
    <View style={styles.myPageText}><Text style={{ fontWeight: "450", fontSize: 20 }}>마이페이지</Text></View>
      
    <View style={styles.upContentContainer}>
      <Image style={styles.profilePicture} source={require('../../img/initialProfile.jpg')}></Image>
        <View style={styles.idText}><Text style={{fontWeight: "400", fontSize: 20}}>아이디</Text></View>
    </View>

    <View style={styles.contentContainer}>
      <TouchableOpacity style={styles.btnStyle} onPress = {GoToOptionScreen}>
        <Text style = {{color: 'black', fontSize: 20,}}>옵션</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress = {GoToEditProfileScreen}>
        <Text style = {{color: 'black', fontSize: 20,}}>개인정보변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress = {GoToLogoutScreen}>
        <Text style = {{color: 'black', fontSize: 20,}}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress = {GoToDeleteAccountScreen}>
        <Text style = {{color: 'black', fontSize: 20,}}>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>    
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  upContentContainer: {
    flexDirection: 'row',
    marginBottom: 80,
  }, 

  myPageText: {
    marginTop: 40,
  },

  profilePicture: {
    marginTop: 30,
    marginLeft: -100,
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: 'white',
  },

  idText: {
    marginVertical: 60,
    marginLeft: 60,
  },
  /*btnOption, btnEditProfile, btnLogout, btnDeleteAccount*/
  btnStyle: {
    marginVertical: -1,
    width: Dimensions.get('window').width, /*360*/
    height: 60,
    borderWidth: 1,
    borderBottomColor: 'black',
    borderLeftColor: 'white', 
    borderRightColor: 'white',
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 20,
  },
});

export default MyPageScreen;