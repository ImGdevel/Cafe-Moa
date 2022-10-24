import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import getReserveStyle from "../../styles/screens/ReserveStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import getModalStyle from "../../styles/components/ModalStyle";

function ReservationScreen({ navigation }) {
  const [selectedSeat, setSelectedSeat] = useState("1");
  const [modalVisible, setModalVisible] = useState(true);
  const [modalOutput, setModalOutput] = useState("Open Modal");

  const timeArr = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  var timeLoop = [];
  for (let i = 0; i < timeArr.length; i++) {
    timeLoop.push(
      <TouchableOpacity
        key={i}
        style={getModalStyle.modalButton}
        onPress={() => {
          setModalOutput("선택 1");
          setModalVisible(false);
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>{timeArr[i]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={getReserveStyle.container}>
      <Modal
        isVisible={modalVisible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={getModalStyle.modalView}>
          <View style={getModalStyle.modalWrapper}>
            <Text style={getModalStyle.modalGradeText}>시간을 선택하세요</Text>
          </View>

          <ScrollView style={getModalStyle.ScrollView}>{timeLoop}</ScrollView>
        </View>
      </Modal>

      <View style={getFindStyle.container}>
        <View style={getFindStyle.contentContainer}>
          <CafeTable
            name={"Coffee Bay"}
            location={"용인시 처인구"}
            image={""}
            information={"--카페정보--"}
          />
        </View>
      </View>

      <View style={getReserveStyle.seatContainer}>
        <Image
          source={require("../../img/anySeatPic_text.png")}
          resizeMode="stretch"
          style={getReserveStyle.seatPic}
        />
      </View>

      <Text style={{ alignSelf: "center" }}>
        예약 가능한 좌석만 선택창에 표시됩니다.
      </Text>
      <View style={getReserveStyle.pickerBox}>
        <Picker
          style={getReserveStyle.picker}
          selectedValue={selectedSeat}
          onValueChange={(itemValue, itemIndex) => setSelectedSeat(itemValue)}
        >
          <Picker.Item label="seat1" value="1" />
          <Picker.Item label="seat2" value="2" />
        </Picker>

        <TouchableOpacity
          style={getReserveStyle.reserveBtn}
          onPress={() => navigation.navigate("ReserveEnd")}
        >
          <Text style={{ color: "white", fontSize: 15 }}>예약하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={require("../../img/coffeebayLogo_test.jpg")}
              style={getReserveStyle.cafeLogo}
            />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default ReservationScreen;
