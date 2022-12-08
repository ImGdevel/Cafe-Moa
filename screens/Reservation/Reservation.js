import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import getReserveStyle from "../../styles/screens/ReserveStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import getModalStyle from "../../styles/components/ModalStyle";
import { ReservationService } from "../../lib/ReservationService";
import { sendReservetionToUser } from "../../lib/UserDataService";
import { CafeService } from "../../lib/CafeService";
import * as Notifications from "expo-notifications";

function ReservationScreen({ navigation, route }) {
  const { cafeData: cafe_data, userData: user_data } = route.params;

  const [cafeData, setCafeData] = useState(cafe_data);
  const [userData, setUserData] = useState(user_data);
  const [seatImage, setSeatImage] = useState(cafe_data.getSeatImage());
  const [seatData, setSeatData] = useState(new ReservationService());
  const [selectedSeat, setSelectedSeat] = useState();
  const [modalVisible, setModalVisible] = useState(true);
  const [modalOutput, setModalOutput] = useState("Open Modal");
  const [time, setTime] = useState(0);
  const [seatList, setSeatList] = useState();
  const [nowTime, setNowTime] = useState(12);

  useEffect(() => {
    SeatTimeTable();
  }, []);

  const SeatTimeTable = async () => {
    let timeTable = new ReservationService(cafeData.getSeatId());
    await timeTable.loadSeatDataBase();
    setSeatData(timeTable);
  };

  var timeLoop = [];

  for (let i = cafe_data.getOpenTime(); i < cafe_data.getEndTime(); i++) {

    const clock = `${(i<10)?"0"+1:i}:00`;
    let lock = (i >= nowTime) ? true : false;
    console.log(clock, lock);
    
    timeLoop.push(
      <TouchableOpacity
        key={i}
        style={getModalStyle.modalButton}
        disabled = {lock}
        onPress={() => {
          setModalOutput("선택");
          setModalVisible(false); //창닫기
          onSelectTime(i); //시간 선택
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>{clock}</Text>
      </TouchableOpacity>
    );
  }

  function onSelectTime(time) {
    setTime(time);
    makePickerItem(time);
  }

  // picker item에 추가하는 loop
  const makePickerItem = (time) => {
    setTime(time);
    let arr = new Array();
    var seatLoop = [];
    seatData.getSeatDataOnTime(time).forEach((element) => {
      arr.push(element.seat);
    });
    for (var i = 1; i <= cafeData.getSeatCount(); i++) {
      if (
        arr.find(function (data) {
          return data == i;
        }) == null
      ) {
        seatLoop.push(<Picker.Item key={i} label={String(i)} value={i} />);
      }
    }
    setSeatList(seatLoop);
  };

  const submitReservation = async () => {
    if (seatData.seatId == null) return;

    await seatData.loadSeatDataBase();
    await userData.getUserProfile();

    if (!userData.isReserve()) {
      if (await seatData.doSeatReservation(time, selectedSeat)) {
        await userData.sendReservetionToUser(
          cafeData.getId(),
          cafeData.getSeatId(),
          time,
          selectedSeat
        );
        cafeData.addNowVisitor();
        let service = new CafeService();
        service.updateCafeData(cafeData);

        Notifications.scheduleNotificationAsync({
          content: {
            title: "CafeMoa " + cafeData.getName() + " 예약알림",
            body:
              "약 10분 후 좌석 배정 확정 마감 (" + selectedSeat + "번 좌석)",
          },
          trigger: {
            seconds: 2, // 초 뒤에 알람, 10분이니까 600 이지만 시연시 2초로 사용 바람
          },
        });

        navigation.navigate("ReserveEnd");
      } else {
        alert("이미 예약된 좌석입니다.");
      }
    } else {
      alert("이미 예약 내역이 있습니다.");
    }
  };

  return (
    <View style={getReserveStyle.container}>
      <Modal
        isVisible={modalVisible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <>
          <View style={getModalStyle.modalView}>
            <View style={getModalStyle.modalWrapper}>
              <Text style={getModalStyle.modalGradeText}>
                시간을 선택해 주세요
              </Text>
            </View>
            <ScrollView style={getModalStyle.ScrollView}>{timeLoop}</ScrollView>
          </View>
        </>
      </Modal>

      <View style={getFindStyle.container}>
        <View style={getFindStyle.contentContainer}>
          <CafeTable cafeData={cafeData} navigation={navigation} />
        </View>
      </View>

      <View style={getFindStyle.topContainer}>
        <Image
          source={{ uri: seatImage }}
          resizeMode="stretch"
          style={getReserveStyle.seatPic}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={getReserveStyle.pickerTopTextArea}>
          <Text style={getReserveStyle.pickerTopText}>좌석 예약</Text>
        </View>
        <View style={{ flex: 2, marginBottom: 15 }}>
          <View style={getReserveStyle.pickerBox}>
            <View style={getReserveStyle.pickerLine}>
              <Picker
                style={getReserveStyle.picker}
                selectedValue={selectedSeat}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSeat(itemValue);
                }}
              >
                {seatList}
              </Picker>
            </View>
            <TouchableOpacity
              style={getReserveStyle.reserveBtn}
              onPress={submitReservation}
            >
              <Text style={{ color: "white", fontSize: 15 }}>예약하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const cafeData = props.cafeData;
  const [cafeName, setCafeName] = useState(cafeData.getName());
  const [cafeLocation, setCafeLocation] = useState(cafeData.getAdress(1, 3));
  const [cafeInformation, setCafeInformaion] = useState(
    "Open : " +
      cafeData.getOpenTime() +
      ":00 ~ Close : " +
      cafeData.getCloseTime() +
      ":00"
  );
  const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.getLogo());

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={{ uri: cafeLogoImage }}
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
