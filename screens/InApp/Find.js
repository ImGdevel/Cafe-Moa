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
        console.log("카페 데이터",cafe_data);
        setcafeDatas(cafe_data);
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
          name={cafeDatas[i].getName()}
          location={cafeDatas[i].getAdress(1,3)}
          image={cafeDatas[i].getLogo()}
          information={
            "Open : " +
            cafeDatas[i].getOpenTime() +
            ":00 ~ Close : " +
            cafeDatas[i].getCloseTime() +
            ":00"
          }
          cafeData={cafeDatas[i]}
          navigation={navigation}
        />
      );
    }
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
  console.log(props.image)
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);
  const [cafeLogoImage, setCafeLogoImage] = useState(props.image);
  return (
    <TouchableHighlight
      style={getCafeTableStyle.container}
      onPress={() =>
        props.navigation.navigate("Information", {
          name: cafeName,
          location: cafeLocation,
          image: "",
          information: cafeInformation,
          cafeData: props.cafeData,
        })
      }
      activeOpacity={0.5}
      underlayColor="#DDDDDD"
    >
      <>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image source={{uri:cafeLogoImage}} style={{ width: '100%', height: '100%', borderRadius:20, }} />
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
