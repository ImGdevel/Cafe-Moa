import React, {useState, useEffect} from 'react';
import { Image, Dimensions, TouchableOpacity, View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

function MyPageScreen({ navigation }) {
  //const [userId, setUserId] = useState(props.userId);

  function GoToOptionScreen(){
    //navigation.navigate()
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
      <View style={styles.idText}><Text style={{fontWeight: "400", fontSize: 20}}>userId</Text></View>
    </View>

    <View style={styles.contentContainer}>
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
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  upContentContainer: {
    flex: 0.4,
    flexDirection: 'row',
    marginBottom: '30%', 
  }, 

  myPageText: {
    marginTop: '10%', 
  },

  profilePicture: {
    marginTop: '10%', 
    marginLeft: '-30%', 
    width: '30%', 
    height: '64%', 
    borderRadius: 75,
    backgroundColor: 'white',
  },

  idText: {
    marginVertical: '20%', 
    marginLeft: '10%', 
  },
  
  btnOption: {
    width: Dimensions.get('window').width, 
    height: '15%', 
    borderTopWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 20,
  },

  btnEditProfile: {
    width: Dimensions.get('window').width, 
    height: '15%',     
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 20,
  },

  btnLogout: {
    width: Dimensions.get('window').width, 
    height: '15%',     
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 20,
  },

  btnDeleteAccount: {
    width: Dimensions.get('window').width, 
    height: '15%', 
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: 20,
  }
});

export default MyPageScreen;