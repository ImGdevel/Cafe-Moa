import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import { getCafeDatabaseAd } from "../../lib/Database";
import { getGeoLocation } from "../../lib/LocationService";


function FindScreen({ navigation, route }) {
  const [cafeLoop, setCafeLoop] = useState([]);
  const [cafeDatas, setcafeDatas] = useState([]);
  const [location,setLocation] = useState();

  useEffect(()=>{
    loadFindPage();
  },[setCafeLoop])

  useEffect(()=>{
    CafeListLoad();
  },[cafeDatas])

  const loadFindPage = async() => {
    console.log("페이지 로드");
    let point;
    if(location == null){
      await getGeoLocation().then(async(loc)=>{
        point = loc 
        console.log("위치정보",point); 
        let cafe_data = await getCafeDatabaseAd(location);
        setcafeDatas(cafe_data);
        console.log("카페 데이터",cafe_data);
        
        CafeListLoad();
      })
    }
  };

  const CafeListLoad = () => {
    let cafeList = [];
    for (let i = 0; i < cafeDatas.length; i++) {
      cafeList.push(
        <CafeTable
          key={i}
          cafeData={cafeDatas[i]}
          navigation={navigation}
        />
      );
    }
    console.log("페이지 출력");
    setCafeLoop(cafeList);
  }
  return (
    <View style={getFindStyle.container}>
      <View style={{ flex: 0.3, backgroundColor: "#ccc" }}></View>
      <View style={getFindStyle.contentContainer}>
        <ScrollView>{cafeLoop}</ScrollView>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const cafeData = props.cafeData;
  const [cafeName, setCafeName] = useState(cafeData.getName());
  const [cafeLocation, setCafeLocation] = useState(cafeData.getAdress(1,3));
  const [cafeInformation, setCafeInformaion] = useState("Open : "+cafeData.getOpenTime()+":00 ~ Close : " +cafeData.getCloseTime() +":00");
  const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.getLogo());
  return (
    <TouchableHighlight
      style={getCafeTableStyle.container}
      onPress={() =>
        props.navigation.navigate("Information", {
          cafeData: props.cafeData,
        })
      }
      activeOpacity={0.5}
      underlayColor="#DDDDDD"
    >
      <>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image source={{uri:cafeLogoImage}} style={{ width: '100%', height: '100%', borderRadius:20,}} />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

export default FindScreen;
