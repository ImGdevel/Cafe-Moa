import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import { getCafeDatabaseAd } from "../../lib/Database";
import { getGeoLocation } from "../../lib/LocationService";

import Ionicons from "react-native-vector-icons/Ionicons";
import { sample_CafeData } from "../../lib/TestSample";

function FindScreen({ navigation, route }) {
  const [textInputValue, setTextInputValue] = useState("");

  const [cafeLoop, setCafeLoop] = useState([]);
  const [cafeDatas, setcafeDatas] = useState([]);
  const [location,setLocation] = useState();

  useEffect(()=>{
    loadFindPage();
    CafeListLoad();
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
        let cafe_data = await getCafeDatabaseAd(location);
        setcafeDatas(cafe_data);
        CafeListLoad();
      }).catch(async(err)=>{
        console.log("에러 발생 샘플로 정보 대체",err)
        setcafeDatas(await sample_CafeData());
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
  
  const search = () =>{

  }
  const filter = () =>{

  }

  return (
    <View style={getFindStyle.container}>
      <View style={{ flex: 0.3, backgroundColor: "#ccc" }}>
        <View style={getFindStyle.searchbarContainer}>
          <TextInput
            style={getFindStyle.textinputBox}
            onChangeText={(text) => setTextInputValue(text)}
            value={textInputValue}
            placeholder="검색"
          />
          <TouchableOpacity style={getFindStyle.btnSearch} onPress={search}>
            <Ionicons
              name="search-outline"
              style={{ fontSize: 20, color: "#001D44" }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={getFindStyle.filterContainer}>
          <TouchableOpacity style={getFindStyle.btnFilter} onPress={filter}>
            <Ionicons
              name="filter-outline"
              style={{ fontSize: 20, color: "#001D44" }}
            >
              <Text style={{ fontSize: 15, color: "#001D44" }}> 필터</Text>
            </Ionicons>
          </TouchableOpacity>
        </View>
      </View>
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
