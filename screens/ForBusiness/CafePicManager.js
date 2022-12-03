import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import getInfoStyle from "../../styles/screens/InfoStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import getBusinessInfoStyle from "../../styles/screens/BusinessInfoStyle";
import getPicManageStyle from "../../styles/screens/PicManageStyle";

import Ionicons from "react-native-vector-icons/Ionicons";
import { ReviewService } from "../../lib/ReviewService";
import { getImage, pickImage, uploadImage } from "../../lib/ImageService";

// Array that bring cafe's image
const imgArr = [
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
];

let cafe;

function CafePicManageScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [direction, setDirection] = useState("사진");
  // const [seatImage, setSeatImage] = useState(cafe_Data.getSeatImage());
  
  const [seatImage, setSeatImage] = useState();

  useEffect(() => {
        
  },[]);


  return (
    <>
      <View style={getInfoStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              cafeDatas={cafeData}
              navigation={navigation}
            />
          </View>
        </View>

        <View style={{ flex: 4.5 }}>
          <PreviewLayout
            selectedValue={direction}
            values={["사진", "좌석"]}
            setSelectedValue={setDirection}
            style={getInfoStyle.contentLayout}
            navigation={navigation}
            cafeData={cafeData}
          >{/*
            <FlatList
              keyExtractor={(item) => item.idx}
              data={imgArr}
              style={getInfoStyle.picArea}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate("사진 확대", {
                      // source: "../../img/coffeebayLogo_test.jpg",
                    })
                  }
                  onLongPress={longPressButton}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Image style={getInfoStyle.image} source={{}} />
                  </View>
                </TouchableHighlight>
              )}
              numColumns={3}
                  />*/}
          </PreviewLayout>
        </View>

        <View style={getInfoStyle.btnContainer}>
          <TouchableOpacity
            style={getInfoStyle.reserveButton}
            onPress={() =>
              navigation.navigate("카페 사진 추가", {
                // cafeData: cafeData,
                // userData: userData,
              })
            }
          >
            <Text style={{ color: "white", fontSize: 21 }}>사진 추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const longPressButton = () =>
  Alert.alert("", "사진을 삭제하시겠습니까?", [
    {
      text: "취소",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "삭제", onPress: () => console.log("OK Pressed") },
  ]);


//카페 테이블
function CafeTable(props) {
  const { cafeDatas: cafeData } = props;
  const [cafeName, setCafeName] = useState();
  const [cafeLocation, setCafeLocation] = useState();
  const [cafeInformation, setCafeInformaion] = useState();
  const [cafeLogoImage, setCafeLogoImage] = useState();
  const [rating, setRating] = useState();
  
  useEffect(()=>{
    if(cafeData != null){
      setCafeName(cafeData.getName());
      setCafeLocation(cafeData.getAdress(1, 3));
      setCafeInformaion( "Open : " + cafeData.getOpenTime() +":00 ~ Close : " +cafeData.getCloseTime() +":00");
      setCafeLogoImage(cafeData.getLogo());
      setRating(cafeData.getRating());
      setCafeLogoImage( {uri:cafeData.getLogo()});
    }else{
    }
  },[,cafeData])

  const changeLogo = async() => {
    const img = await pickImage();
    setCafeLogoImage({uri:img}); //이미지 피커에서 가져온 이미지 쓸라면 {uri: 가져온 uri} 로 싸야한다.
    await uploadImage(img,"Cafe",cafeData.getId(),"logo")
  }

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image source={cafeLogoImage} style={getInfoStyle.cafeLogo} />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
          <View style={getCafeTableStyle.logoPickerContainer}>
            <TouchableOpacity
              style={getCafeTableStyle.LogoImagePicker}
              onPress={changeLogo}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                로고 변경하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}




const PreviewLayout = ({
  children,
  values,
  selectedValue,
  setSelectedValue,
  cafeData,
  navigation,
}) => {
  console.log(cafeData);
  const [seatImage, setSeatImage] = useState(cafeData.getSeatImage());

  const seatLongPressButton = () =>
  Alert.alert("", "사진을 변경하시겠습까?", [
    {
      text: "취소",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { 
      text: "확인", 
      onPress: () => changeSeatImage()
    },
  ]);

  async function changeSeatImage(){
    const img =  await pickImage(7,5,false);
    setSeatImage(img);
    uploadImage(img,"Cafe",cafeData.getId(),"seatImage");
  }


  return(
  <View style={{ paddingHorizontal: 10, flex: 1 }}>
    <Text style={{ fontSize: 22 }}></Text>
    <View style={getInfoStyle.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            getPicManageStyle.button,
            selectedValue === value && getInfoStyle.selected,
          ]}
        >
          <Text
            style={[
              getInfoStyle.buttonLabel,
              selectedValue === value && getInfoStyle.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    {(() => {
      if (selectedValue === "사진")
        return <View style={getInfoStyle.container}>{children}</View>;
      else
        return (
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onLongPress={seatLongPressButton}
          >
            <Image
              source={{uri:seatImage}}
              style={getInfoStyle.seatPic}
            />
          </TouchableOpacity>
        );
    })()}
  </View>
)};

export default CafePicManageScreen;
