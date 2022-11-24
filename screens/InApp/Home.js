import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import { getCafeData } from "../../lib/CafeService";
import { UserDataService } from "../../lib/UserDataService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CafeTable } from "../../lib/Components/CafeTable";

function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState();
  const [reserveCafeInfo, setReserveCafeInfo] = useState();
  const [bookMarkList, setBookMarkList] = useState();
  const [reserveHistory, setReserveHistory] = useState();


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async() => {
      LoadHomePage();
    });
    return unsubscribe;
  }, [navigation, setUserData]);

  /** 유저 데이터 가져오기 */
  const LoadHomePage = async () => {
    let user = new UserDataService();
    await user.loadUserId();
    await user.getUserProfile();
    setUserData(user);
  }
     
  /** 예약 내역 로드 */
  useEffect(() => {
    updateConfirmReservation();
    refresBookMark();
  }, [userData]);
  const updateConfirmReservation = async () => {
    if (userData != null && userData.reservation.cafeId != null) {
      setReserveCafeInfo(await getCafeData(userData.reservation.cafeId));
      //refreshReserve();
    } else {
      setReserveCafeInfo(null);
    }
  };

  /** Bookmark 리스트 */
  function refresBookMark(){
    if(userData == null) return;
    if(userData.bookmark != null){
      /*
      let Book = reserveCafeInfo.bookmark;
      let cafeList = [];
      for (let i = 0; i < Book.length; i++) {
        cafeList.push(
          <CafeTable
            key={i}
            cafeData={cafeDatas[i]}
            userData={userData}
            navigation={navigation}
          />
        );
      }
      setcafeTableList(cafeList);
      */
      console.log("북마크")
    }else if(true){
      setBookMarkList();
    }
  }
  
  function ReservationView(props){
    const {cafeData: cafeData, userData: userData} = props;
    console.log(cafeData);
    if(cafeData == null){
      return <></>
    }
    return(
      <View  style = {getHomeStyle.reserveArea}>
        <View style = {getHomeStyle.reserveAreaTop}>
          <Text style={getHomeStyle.AreaTitle}> 현제 예약 내역 </Text>
        </View>
        <View style = {getHomeStyle.reserveAreaContent}>
          <View style = {getHomeStyle.reserveCafeContainer}>
          <CafeTable
            cafeData={cafeData}
            userData={userData}
            navigation={navigation}
          />
          </View>
          <View style = {getHomeStyle.reserveBtnContainer}>
            <TouchableOpacity style = {getHomeStyle.reserveBtn}>
              <Text style={getHomeStyle.reserveBtnText}> 예약 내역 확인 </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {getHomeStyle.reserveBtn}>
              <Text style={getHomeStyle.reserveBtnText}> 배정 확정 </Text>
            </TouchableOpacity>
          </View>
        </View>
       </View>
    )
  }

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style = {getHomeStyle.TopView}>
        <View style = {getHomeStyle.TopViewTop}></View>
        <View style = {getHomeStyle.TopTitle}>
          <Text style={{ color: "#001D44", fontWeight: "900", fontSize: 60 }}> M O A </Text>
        </View>
        <View style = {getHomeStyle.TopViewBottom}></View>
      </View>

      <View style = {getHomeStyle.MainView}>
        <ScrollView showsVerticalScrollIndicator = {false}>
          {/**현제 예약 중인 카페*/}
          <ReservationView
            cafeData={reserveCafeInfo}
            userData={userData}
          />
          {reserveHistory}

          {/**자주가는 카페*/}
          <View style = {getHomeStyle.BookMarkArea}>
            <View style ={{height: 50}}>
              <Text style={getHomeStyle.AreaTitle}> My 모아 </Text>
            </View>
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator = {false}
              style = {{flex: 1}}
            >
              {bookMarkList}
            </ScrollView>
          </View>

          {/** 광고  */}
          <View style = {getHomeStyle.AdArea}>
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator = {false}>
              <AdPanel/> 
              <AdPanel/> 
              <AdPanel/> 
              <AdPanel/>
            </ScrollView>
          </View>
        
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

function AdPanel(){
  return(
    <View style={getHomeStyle.AdPanel}>
      <Image/>
    </View>
  );
}

function BookMarkPanel(props){
  const { cafeData: cafe_data} = props;
  const [cafeData, setCafeData] = useState(cafe_data);
  const [cafeName, setCafeName] = useState();
  const [cafeLocation, setCafeLocation] = useState();
  const [rating, setRating] = useState();
  useEffect(()=>{
    if(cafe_data != null){
      setCafeName(cafe_data.getName());
      setCafeLocation(cafe_data.getAdress(1, 3));
    }
  },[cafeData])

  return(
    <View style={getHomeStyle.BookMarkPanel}>
      <View style={getHomeStyle.BookMarkPanelImageBox}>
          <Image style={{flex:1}}/>
      </View>
      <View style={getHomeStyle.BookMarkPanelTextBox}>
        <View style={{flex:1, backgroundColor:"#ddd"}}> 
          <Text>{cafeName}</Text>
          <Text>{rating}</Text>
        </View>
        <View style={{flex:1, backgroundColor:"aaa"}}>
          <Text>{cafeLocation}</Text>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen;