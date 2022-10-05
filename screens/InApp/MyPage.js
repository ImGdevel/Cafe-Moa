import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function MyPageScreen({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container}>
    {/* 여기부터 수정 구역(KeyboardAvoidingView 포함) */}
    <View style={styles.contantArea}> {/*필요?*/}
    <View style={styles.profileText}><Text style={{ fontWeight: "500", fontSize: 40 }}>마이페이지</Text></View>
    </View>

    <View style={styles.profilePicture}>
    </View>

    <View style={styles.idText}><Text style={{fontSize: 20}}>{...id}</Text></View>

    <View style={styles.horizeLine}></View>

    <View style={styles.btnArea}>
      <TouchableOpacity style={styles.btnOption} onPress = {GoToOptionScreen}>
        <Text style = {{color: 'black', fontSize: 20,}}>옵션</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnEditProfile} onPress = {GoToEditProfileScreen}>
        <Text style = {{color: 'black', fontSize: 20,}}>개인정보변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogout} onPress = {GoToLogoutScreen}>
        <Text style = {{color: 'black', fontSize: 20,}}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnDeleteAccount} onPress = {GoToDeleteAccountScreen}>
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
    justifyContent: 'center',
  },
  //여기부터 수정
  profileText: {
    width: 100,
    height: 100,
    border: 15,
    borderRadius: '50%',
  },

  idText: {
    /*필요한가?*/
  },

  horizeLine: {
    border: 0,
    width: '50%',
    height: 10,
    backgroundColor: '#black',
  },

  btnArea: {
    width: '100%',
    height: 100,
  },

  btnOption, btnEditProfile, btnLogout, btnDeleteAccount: {
    margin: 1,
    width: '100%',
    height: 60,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#white',
  },
});

export default MyPageScreen;