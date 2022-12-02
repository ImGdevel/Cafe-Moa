import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
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
  const [cafeImfo, setcafeImfo] = useState("");
  const cafeNameInputRef = createRef();
  const cafeLocationInputRef = createRef();
  const cafeImfoInputRef = createRef();
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

  return (
    <KeyboardAvoidingView style={getInputStyle.container}>
      <View style={{ flex: 3 }}></View>
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
      <View style={{ flex: 4 }}></View>
    </KeyboardAvoidingView>
  );
}

export default InPutDataScreen;
