import React, { useState, useEffect, createRef } from "react";
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
import { getRandomCafeData } from "../../lib/TestSample";
import { getGeoLocation } from "../../lib/LocationService";
import getInputStyle from "../../styles/screens/InputDataStyle";
import {
  addCafeDatabase,
  CafeService,
  getCafeDatabase,
  getCafeDatabaseAd,
} from "../../lib/CafeService";
import { ReviewService } from "../../lib/ReviewService";

function InPutDataScreen({ navigation }) {
  const [cafeName, setcCafeName] = useState("");
  const [cafeLocation, setCafeLocation] = useState({
    latitude: 37,
    longitude: 127,
  });
  const [cafeInfo, setcafeImfo] = useState("");
  const cafeNameInputRef = createRef();
  const cafeLocationInputRef = createRef();
  const cafeInfoInputRef = createRef();
  const cafeTimeRef = createRef();
  const [local, setLocal] = useState("");

  const [cafeDatas, setCafeDatas] = useState([]); //가져와질 데이터
  const [cafeClass, setCafeClass] = useState([]);

  const [image, setImage] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    setting();
  }, []);

  const setting = async () => {
    setLocal(await getGeoLocation());
  };

  const Button1 = async () => {
    var data;
    await getRandomCafeData().then((cafe) => {
      data = cafe;
    });

    let cafeservice = new CafeService();
    cafeservice.addCafeDatabase(data);
  };
  const Button2 = async () => {};

  const Button3 = async () => {
    // 아래는 테스트 예시, 성공! 삭제 가능
    // let userdata = await getUserProfile();
    // console.log(userdata);
    // let userre = await getReservetionToUser();
    // console.log(userre);
    // let userdel = await deleteReservationToUser();
    // console.log(userdel);
  };

  function SubmitCreateCafe() {
    navigation.replace("Business");
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
            <Image
              source={require("../../img/coffeebayLogo_test.jpg")}
              style={{ width: "100%", height: "100%", borderRadius: 15 }}
            />
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
              <Text
                style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}
              >
                카페 위치
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ width: "100%", height: "5%", backgroundColor: "white" }}
        ></View>
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
                  ref={cafeNameInputRef}
                  style={getInputStyle.timeTextInput}
                  placeholder={"시간"}
                  onChangeText={(text) => setcCafeName(text)}
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
              <Text
                style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}
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
                  ref={cafeNameInputRef}
                  style={getInputStyle.timeTextInput}
                  placeholder={"시간"}
                  onChangeText={(text) => setcCafeName(text)}
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
            <Image
              source={require("../../img/anySeatPic_text.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
                resizeMode: "contain",
              }}
            />
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
      {/* <View style={{ flex: 3 }}></View>
      <View style={getInputStyle.contentArea}>
        <View style={getInputStyle.titleText}>
          <Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text>
        </View>
        <View style={getInputStyle.subTitleText}>
          <Text style={{ fontWeight: "600", fontSize: 30 }}> Sing Up </Text>
        </View>
        <View style={getInputStyle.formArea}>
          <TextInput
            ref={cafeNameInputRef}
            style={getInputStyle.textInput}
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
          <TextInput
            ref={cafeLocationInputRef}
            style={getInputStyle.textInput}
            placeholder={"카페위치"}
            onChangeText={(cafeLocation) => setCafeLocation(cafeLocation)}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() =>
              cafeImfoInputRef.current && cafeImfoInputRef.current.focus()
            }
          />
          <TextInput
            ref={cafeImfoInputRef}
            style={getInputStyle.textInput}
            placeholder={"정보"}
            onChangeText={(cafeImfo) => setcafeImfo(cafeImfo)}
            autoCapitalize="none"
          />
          <View>
            <Text>{name}</Text>
            <Image
              source={image != null ? { uri: image } : null}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
        <View style={getInputStyle.btnArea}>
          <TouchableOpacity style={getInputStyle.btnLogin} onPress={Button1}>
            <Text style={{ color: "white", fontSize: 20 }}> 데이터 넣기 </Text>
          </TouchableOpacity>

          <TouchableOpacity style={getInputStyle.btnLogin} onPress={Button2}>
            <Text style={{ color: "white", fontSize: 20 }}>
              {" "}
              데이터 가져오기{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={getInputStyle.btnLogin} onPress={Button3}>
            <Text style={{ color: "white", fontSize: 20 }}>
              {" "}
              콘솔창에 출력하기{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 4 }}></View> */}
    </KeyboardAvoidingView>
  );
}

export default InPutDataScreen;
