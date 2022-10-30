import React, { useState, useEffect, useTransition } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import { getCafeData } from "../../lib/Database";
import { getUserProfile } from "../../lib/UserDataService";

function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [reserveCafeInfo,setReserveCafeInfo] = useState(null);
  const [reserveLoading,setReserveLoading] = useState(false);

  useEffect(() => {
    LoadHomePage();
  }, [setUserData]);

  const LoadHomePage = async() => {
    //시작할때 초기작업
    if(userData == null){
      await getUserProfile().then(async(data)=>{
        setUserData(data); //예약 내역 확인
        console.log(data.reservation)
        if(data.reservation.cafeId != null){
          let reserve_cafe = await getCafeData(reservation.cafeId);
          console.log(reserve_cafe);
          setReserveCafeInfo(reserve_cafe);
          setReserveLoading(true);
        }
      })
    }
  }
  
  /*
          onPress={() =>{
            if(reserve_cafe != null){
              navigation.navigate("ConfirmReservation", {
                //cafeId: userData.cafeId,
                //time: userData.time,
                //seatNumber: userData.seatNumber,
              })
            }
          }}*/
  const ReservationsHistory = () =>{
    
    return(
      <>
                <View style={getHomeStyle.infoContentContainer}>
            <View style={getCafeTableStyle.imageContainer}>
              <Image
                source={require("../../img/coffeebayLogo_test.jpg")}
                style={getHomeStyle.image}
              />
            </View>
          <View>
        <Text style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}>
          {(reserveLoading) ? userData.Name : "" }
        </Text>
        <Text style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}>
          {(reserveLoading) ? reserveCafeInfo.Name : "" }
        </Text>
        <Text style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}>
          {(reserveLoading) ? "" : ""}
        </Text>
        <Text style={{ color: "#001D44", fontSize: 20, marginHorizontal: 20 }}>
        {"\n\t\t\t\t\t\t"}▶ 내역 확인하기
        </Text>
        </View>
      </View>
      </>)
  }

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style={getHomeStyle.homeText}>
        <Text style={{ color: "#001D44", fontWeight: "700", fontSize: 65 }}>
          M O A
        </Text>
      </View>

      <View style={getHomeStyle.contentContainer}>
        <View>
          {/**다른 홈내용 */}          
        </View>
        <View style={getHomeStyle.btnInfoReservation}>
          <View style={getHomeStyle.infoContainer}>
            <Text style={{ color: "white", fontSize: 30, marginHorizontal: 10 }}> 예약내역 </Text>
          </View>
            <ReservationsHistory/>
          </View>
        
        {/*___
        <TouchableOpacity
          style={getHomeStyle.btnNearbyCafe}
          onPress={() => navigation.navigate("Find")}
        >
          <Text style={{ color: "black", fontSize: 45 }}>주변카페</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getHomeStyle.btnMyPage}
          onPress={() => navigation.navigate("MyPage")}
        >
          <Text style={{ color: "black", fontSize: 45 }}>마이 페이지</Text>
        </TouchableOpacity>
         ___*/}
      </View>
    </KeyboardAvoidingView>
  );
}

export default HomeScreen;
