import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { dbService } from "../../FireServer";
import { getCurrentUserId } from "../../lib/AuthService";
import { getCafeData } from "../../lib/CafeService";
import getStartPageStyle from "../../styles/screens/StartPageStyle";

function StartPageScreen({ navigation }) {

  useEffect(() => {
    setTimeout(() =>  isLogin(), 1500);
  }, []);

  async function isLogin() {
    const id = await getCurrentUserId();
    let us = true;
    if(id != null){
      await dbService.collection("BuisnessUser").get().then((list)=>{
        list.forEach((ids)=>{
          if(id == ids.id){
            console.log("비지니스계정");
            us = false;
            GoToBusiness(ids.id);
          }
        })
      });
      if(us){
        GoToHomeScreen();
      }
    }else{
      GoToLoginScreen();
    }
  }

  function GoToLoginScreen() {
    navigation.replace("Auth");
  }

  function GoToHomeScreen() {
    navigation.replace("InApp");
  }

  async function GoToBusiness(id) {
    const userData = (await dbService.collection("BuisnessUser").doc(id).get()).data();
    const cafeData = await getCafeData(userData.cafeId);

    console.log("데이터 보내기",cafeData,userData)

    if(cafeData != null){
      navigation.navigate("Business",{
        cafeData: cafeData,
        userData: userData,
        ons: "Hi",
      });
    }
  }

  return (
    <View style={getStartPageStyle.container}>
      <View style={getStartPageStyle.iconArea}>
        <Image
          style={{ width: "40%", resizeMode: "contain" }}
          source={require("../../img/IconMoa.png")}
        />
      </View>
    </View>
  );
}

export default StartPageScreen;
