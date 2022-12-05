import React, { useState, useEffect, createRef, useReducer } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { CafeData } from "../../lib/CafeData";
import { pickImage } from "../../lib/ImageService";
import getInputStyle from "../../styles/screens/InputDataStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CafeService } from "../../lib/CafeService";
import { getGeoLocation } from "../../lib/LocationService";

function CafeCreatFormScreen({ navigation, route }) {
  const [cafeName, setcCafeName] = useState("");
  const [logoImage, setLogoImage] = useState(
    require("../../img/AddLogoPic.jpeg")
  );
  const [seatImage, setSeatImage] = useState(
    require("../../img/AddSeatPic.jpeg")
  );
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  const [seatCount, setSeatCount] = useState();
  const [address, setAddress] = useState();
  const [adressText, setAddressText] = useState();
  const [location, setLocation] = useState();
  

  const cafeNameInputRef = createRef();
  const cafeLocationInputRef = createRef();
  const cafeOTInputRef = createRef();
  const cafeCTInputRef = createRef();
  const cafeData = new CafeData();

  useEffect(() => {
    locationInpur();
  }, []);

  useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params?.location)
      setAddress(route.params?.address)
      setAddressText(route.params?.addressText);
    }
  }, [route.params?.location]);

  function goMap(){
    
    console.log( "text", adressText)
    if(location?.latitude != null && address?.city1 != null){
      navigation.navigate("LocationSelection", {
        location: location,
        address: address,
        addressText: adressText,
      })
    }
  }
  
  async function locationInpur(){
    const {latitude:la, longitude:lon, address:add, adressText:adt} = await getGeoLocation();
    setLocation({latitude:la, longitude:lon});
    setAddress(add);
    setAddressText(adt);
  }

  async function selectSeatImage() {
    const img = await pickImage(4,3,false);
    setSeatImage({ uri: img });
  }

  async function selectLogoImage() {
    const img = await pickImage();
    setLogoImage({ uri: img });
  }

  async function SubmitCreateCafe() {
    console.log(openTime,closeTime)
    if(seatImage.uri == null){
      alert("카페 대표 이미지를 등록해주세요");
      return;
    }else if(cafeName == null){
      alert("카페이름을 입력해주세요");
      return;
    }else if(seatCount == null){
      alert("총 좌석수를 입력해주세요");
      return;
    }else if(openTime == null || closeTime == null ){
      alert("매장 운영 시간을 입력해주세요");
      return;
    }else if(logoImage.uri == null){
      alert("카페 좌석 이미지를 등록해주세요");
      return;
    }
    try{
      const cafe = new CafeData(cafeName,location,address,seatCount,openTime,closeTime,logoImage.uri,seatImage.uri);
      await (new CafeService).addCafeDatabase(cafe).catch((err)=>{console.log(err)});
    }catch{
      console.log("문제 발생");
      return;
    }
    navigation.replace("Business");
  }

  return (
    <KeyboardAvoidingView style={getInputStyle.container}>
      <View style={getInputStyle.headerContainer}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Create MOA Cafe
        </Text>
      </View>

      <ScrollView style={getInputStyle.contentContainer}>
        <View style={getInputStyle.cafeInfoHeader}>
          <View style={getInputStyle.cafeImagePicker}>
            <TouchableOpacity onPress={selectLogoImage}>
              <Image
                source={logoImage}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={getInputStyle.nameInputContainer}>
            <TextInput
              ref={cafeNameInputRef}
              style={getInputStyle.nameTextInput}
              placeholder={"카페 이름"}
              onChangeText={(cafeName) => setcCafeName(cafeName)}
              autoCapitalize="none"
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() =>
                cafeLocationInputRef.current &&
                cafeLocationInputRef.current.focus()
              }
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TextInput
                ref={cafeNameInputRef}
                style={getInputStyle.seatInput}
                placeholder={"총 좌석 수"}
                onChangeText={(seatCount) => setSeatCount(seatCount)}
                autoCapitalize="none"
                blurOnSubmit={false}
                keyboardType="number-pad"
                returnKeyType="next"
                onSubmitEditing={() =>
                  cafeLocationInputRef.current &&
                  cafeLocationInputRef.current.focus()
                }
              />
              <TouchableOpacity
                style={getInputStyle.locationBtn}
                onPress={goMap}
              >
                <Text> 위치 설정 </Text>

              </TouchableOpacity>
            </View>

            {/*             
            <TouchableOpacity style={getInputStyle.locationButton}  
              onPress={() => navigation.navigate("LocationSelection")
              }>
              <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
                카페 위치
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={getInputStyle.locationContainer}>
          <View style={getInputStyle.locationTextContainer}>
            <Text style={getInputStyle.locationText}>
              <Ionicons name="location-sharp" style={{ fontSize: 25 }} />
              {adressText}
            </Text>
          </View>
        </View>
        <View style={getInputStyle.cafeTimeContainer}>
          <View style={getInputStyle.oncTimeContainer}>
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Open</Text>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                <TextInput
                  ref={cafeOTInputRef}
                  style={getInputStyle.timeTextInput}
                  placeholder={"시간"}
                  onChangeText={(openTime) => {setOpenTime(openTime)}}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    cafeLocationInputRef.current &&
                    cafeLocationInputRef.current.setOpenTime()
                  }
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "30%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>~</Text>
          </View>
          <View style={getInputStyle.oncTimeContainer}>
            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <Text
                style={{ color: "black", fontSize: 20, fontWeight: "bold" }}
              >
                Close
              </Text>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                <TextInput
                  ref={cafeCTInputRef}
                  style={getInputStyle.timeTextInput}
                  placeholder={"시간"}
                  onChangeText={(text) => setCloseTime(text)}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    cafeLocationInputRef.current &&
                    cafeLocationInputRef.current.focus()
                  }
                />
              </View>
            </View>
          </View>
        </View>
        <View style={getInputStyle.seatImagePickerContainer}>
          <View style={getInputStyle.setImagePicker}>
            <TouchableOpacity onPress={selectSeatImage}>
              <Image
                source={seatImage}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={getInputStyle.submitBtnContainer}>
        <TouchableOpacity
          style={getInputStyle.submitButton}
          onPress={SubmitCreateCafe}
        >
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            카페 만들기
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default CafeCreatFormScreen;
