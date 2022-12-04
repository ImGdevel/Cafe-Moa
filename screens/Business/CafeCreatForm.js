
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



function CafeCreatFormScreen({ navigation }) {
  const [cafeName, setcCafeName] = useState("");
  const [logoImage, setLogoImage] = useState(require("../../img/DefaultSeatImage.png"));
  const [seatImage, setSeatImage] = useState(require("../../img/DefaultSeatImage.png"));
  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();
  
  const cafeNameInputRef = createRef();
  const cafeLocationInputRef = createRef();
  const cafeOTInputRef = createRef();
  const cafeCTInputRef = createRef();
  const cafeData = new CafeData();

  useEffect(()=>{
    
  },[])


  function SubmitCreateCafe() {
    navigation.replace("Business");
  }
  
  async function selectSeatImage(){
    const img = await pickImage();
    setSeatImage({uri: img})
  }

  async function selectLogoImage(){
    const img = await pickImage();
    setLogoImage({uri: img})
  }

  
  



  return (
    <KeyboardAvoidingView style={getInputStyle.container}>
      <View style={getInputStyle.headerContainer}>
        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#001D44" }}>
          Create MOA Cafe
        </Text>
      </View>
      
      <View style={getInputStyle.contentContainer}>
        <View style={getInputStyle.cafeInfoHeader}>    
          <View style={getInputStyle.cafeImagePicker}>
            <TouchableOpacity onPress={selectLogoImage} >
              <Image
                source={logoImage}
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
              />
            </TouchableOpacity>
          </View>

          <View style={getInputStyle.nameInputContainer}>
            <TextInput
              ref={cafeNameInputRef}
              style={getInputStyle.nameTextInput}
              placeholder={"카페이름"}
              onChangeText={(cafeName) => setcCafeName(cafeName)}
              autoCapitalize="none"
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() =>
                cafeLocationInputRef.current &&
                cafeLocationInputRef.current.focus()
              }
            />
            <TouchableOpacity style={getInputStyle.locationButton}>
              <Text style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}>
                카페 위치
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "100%", height: "5%", backgroundColor: "white" }}></View>
        <View style={getInputStyle.cafeTimeContainer}>
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
                style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}
              >
                Open
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
                  ref={cafeOTInputRef}
                  style={getInputStyle.timeTextInput}
                  placeholder={"시간"}
                  onChangeText={()=>{

                  }}
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
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#001D44", fontSize: 30, fontWeight: "bold" }}
            >
              ~
            </Text>
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
              <Text style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}>
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
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <View style={getInputStyle.submitBtnContainer}>
        <TouchableOpacity
          style={getInputStyle.submitButton}
          onPress={SubmitCreateCafe}
        >
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            카페 만들기
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default CafeCreatFormScreen;
