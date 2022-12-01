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
import { pickImage } from "../../lib/ImageService";

// Array that bring cafe's image
const imgArr = [
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
];

function CafePicManageScreen({ navigation, route }) {
  //const { cafeData: cafeData, userData: userData } = route.params;
  const [cafeData, setCafeData] = useState();
  // const [userData, setUserData] = useState(user_data);
  const [direction, setDirection] = useState("사진");
  // const [seatImage, setSeatImage] = useState(cafe_Data.getSeatImage());
  const [logoImage, setLogoImage] = useState(
    require("../../img/coffeebayLogo_test.jpg")
  );
  const [seatImage, setSeatImage] = useState();

  useEffect(() => {
    
  },[]);

  return (
    <>
      <View style={getInfoStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              //name={"--카페 이름--"}
              //location={"--카페 위치--"}
              images={logoImage}
              //information={"--카페 정보--"}
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
            // cafeData={cafeData}
          >
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
            />
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

const PicklogoImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });
  console.log(result);
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

//카페 테이블
function CafeTable(props) {
  const { cafeDatas: cafeData, images:image} = props;
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
    }else{
      setCafeLogoImage(image);
    }
  },[,cafeData])

  async function changeLogo(){
    const img = await pickImage();
    setCafeLogoImage({uri:img}); //이미지 피커에서 가져온 이미지 쓸라면 {uri: 가져온 uri} 로 싸야한다.
    //
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

const seatLongPressButton = () =>
  Alert.alert("", "사진을 변경하시겠습까?", [
    {
      text: "취소",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "확인", onPress: () => console.log("OK Pressed") },
  ]);

const PreviewLayout = ({
  children,
  values,
  selectedValue,
  setSelectedValue,
  // cafeData,
  navigation,
}) => (
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
          <TouchableHighlight
            style={{ alignItems: "center", justifyContent: "center" }}
            onLongPress={seatLongPressButton}
          >
            <Image
              source={require("../../img/anySeatPic_text.png")}
              style={getInfoStyle.seatPic}
            />
          </TouchableHighlight>
        );
    })()}
  </View>
);

export default CafePicManageScreen;
