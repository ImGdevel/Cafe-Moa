import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { dbService, MyDatabase } from '../../FireServer';
import { createCafe, createCafe2 } from '../../lib/Database';

function InPutDataScreen({navigation}) {
  const [cafeName,setcafeName] = useState("");
  const [cafeLocation,setcafeLocation] = useState("");
  const [cafeImfo,setcafeImfo] = useState("");
  const [errorText,setErrorText] = useState("");
  
  const cafeNameInputRef = createRef();
  const cafeLocationInputRef = createRef();
  const cafeImfoInputRef = createRef();

  function GoToHomeScreen(){
    navigation.navigate('InApp')
  }

  const onSubmitApplication2 = async() =>{
    await dbService.collection("CafeData").add({
        cafeName,
        cafeLocation,
        cafeImfo,
    })
  }

  const onSubmitApplication = async() =>{
    await dbService.collection("CafeData").doc('dada').collection('user').add({
        cafeName,
        cafeLocation,
        cafeImfo,
    })
  }

  useEffect(()=>{

  },[])

  const [cafeNames, setCafeNames] = useState([]);

  const getDataBaseInData = async() =>{
      const datas = await dbService.collection("CafeData").get();
      datas.forEach((document)=>{
        setCafeNames((prev)=>[document.data(),...prev])
      })
  }

  const getDataBaseInData2 = async() =>{
    dbService.collection("CafeData").onSnapshot((snapshot)=>{
      const cafeArray = snapshot.docs.map((doc)=>({
        ...doc.data(),
      }));
      
    })
    
  }

 
  return (
  <KeyboardAvoidingView style={styles.container} >
    <View style={{flex: 3}}></View>
    <View style={styles.contentArea}>
      <View style={styles.titleText}><Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text></View>
      <View style={styles.subTitleText}><Text style={{ fontWeight: "600", fontSize: 30 }}> Sing Up </Text></View>
      <View style={styles.formArea}>
        <TextInput
          ref={cafeNameInputRef}
          style={styles.textInput}
          placeholder={'카페이름'}
          onChangeText={(cafeName) => setcafeName(cafeName)}
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() =>
            cafeLocationInputRef.current && cafeLocationInputRef.current.focus()
          }
        />
        <TextInput
          ref={cafeLocationInputRef}
          style={styles.textInput}
          placeholder={'카페위치'}
          onChangeText={(cafeLocation) => setcafeLocation(cafeLocation)}
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() =>
            cafeImfoInputRef.current && cafeImfoInputRef.current.focus()
          }
        />
        <TextInput
          ref={cafeImfoInputRef}
          style={styles.textInput}
          placeholder={'정보'}
          onChangeText={(cafeImfo) => setcafeImfo(cafeImfo)}
          autoCapitalize="none"
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
        <View>
          <Text>{}</Text>
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

export default InPutDataScreen;
