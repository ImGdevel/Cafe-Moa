import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Modal from 'react-native-modal';
import { Picker } from "@react-native-picker/picker";
import getReserveStyle from "@styles/screens/ReserveStyle";
import getCafeTableStyle from "@styles/components/CafeTableStyle";
import getModalStyle from "@styles/components/ModalStyle";
import ReservationService from "../services/ReservationService";
import CafeService from "../services/CafeService";
import * as Notifications from "expo-notifications";

const ReservationScreen = ({ navigation, route }) => {
  const { cafeData: cafe_data, userData: user_data } = route.params;

  const [cafeData, setCafeData] = useState(cafe_data);
  const [userData, setUserData] = useState(user_data);
  const [seatImage, setSeatImage] = useState("/");
  const [selectedSeat, setSelectedSeat] = useState();
  const [modalVisible, setModalVisible] = useState(true);
  const [modalOutput, setModalOutput] = useState("Open Modal");
  const [time, setTime] = useState(0);
  const [seatList, setSeatList] = useState([]);
  const [nowTime, setNowTime] = useState(12);

  useEffect(() => {
    SeatTimeTable();
  }, []);

  const SeatTimeTable = async () => {
    try {
      // 예약 서비스를 통해 좌석 데이터를 가져옵니다.
      //console.log(cafeData);
      //const timeTable = await ReservationService.getReservationsByCafeIdAndDate(
      //  cafeData.id,
      //  new Date()
      //);
      //setSeatList(timeTable);
    } catch (error) {
      console.error("Error loading seat data:", error);
    }
  };

  const generateTimeList = () => {
    const timeLoop = [];
    const openingTime = parseFloat(cafe_data.openingTime); // 문자열을 숫자로 변환
    const closingTime = parseFloat(cafe_data.closingTime); // 문자열을 숫자로 변환
  
    // 시작 시간부터 종료 시간까지 30분 간격으로 시간을 생성합니다.
    let currentTime = openingTime;
    while (currentTime <= closingTime) {
      const clock = currentTime;
      const lock = currentTime <= nowTime;
    
      timeLoop.push(
        <TouchableOpacity
          key={currentTime}
          style={[
            getModalStyle.modalButton,
            lock ? { backgroundColor: "#bbb" } : undefined,
          ]}
          disabled={lock}
          onPress={() => {
            if (!lock) {
              setModalOutput("선택");
              setModalVisible(false);
              onSelectTime(currentTime);
            }
          }}
        >
          <Text style={{ alignSelf: "center", fontSize: 20 }}>{clock}:00</Text>
        </TouchableOpacity>
      );
    
      currentTime += 1.0;
    }
    
  
    return timeLoop;
  };
  

  const onSelectTime = (selectedTime) => {
    setTime(selectedTime);
    makePickerItem(selectedTime);
  };

  const makePickerItem = (selectedTime) => {
    let availableSeats = [];
    seatList.forEach((element) => {
      if (element.time === selectedTime) {
        availableSeats = element.seats;
      }
    });

    let seatLoop = [];
    for (let i = 1; i <= cafeData.seatCount; i++) {
      if (!availableSeats.includes(i)) {
        seatLoop.push(<Picker.Item key={i} label={String(i)} value={i} />);
      }
    }
    setSeatList(seatLoop);
  };

  const submitReservation = async () => {
    try {
      // 예약 요청을 생성합니다.
      const reservationRequestDTO = {
        userId: userData.userId,
        cafeId: cafeData.cafeId,
        time: time,
        seatNumber: selectedSeat,
      };
      const createdReservation = await ReservationService.createReservation(
        reservationRequestDTO
      );

      // 예약이 성공하면 알림을 예약합니다.
      Notifications.scheduleNotificationAsync({
        content: {
          title: `CafeMoa ${cafeData.name} 예약알림`,
          body: `약 10분 후 좌석 배정 확정 마감 (${selectedSeat}번 좌석)`,
        },
        trigger: {
          seconds: 2, // 시연용으로 2초 설정, 실제로는 600으로 변경
        },
      });

      navigation.navigate("ReservationConfirmation"); // 예약 확인 화면으로 이동
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("예약에 실패했습니다.");
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
            <ScrollView style={getModalStyle.ScrollView}>
              {generateTimeList()}
            </ScrollView>
          </View>
        </>
      </Modal>

      <View style={getReserveStyle.container}>
        <View style={getReserveStyle.topContainer}>
          <CafeTable cafeData={cafeData} />
        </View>
        <View style={getReserveStyle.contentContainer}>
          <Image
            source={{ uri: seatImage }}
            resizeMode="contain"
            style={getReserveStyle.seatPic}
          />
        </View>
      </View>
      <View style={getReserveStyle.bottomContainer}>
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
};

const CafeTable = ({ cafeData }) => {
  const cafeName = cafeData.name;
  const cafeLocation = cafeData.address;
  const cafeInformation = `Open : ${cafeData.openingTime}:00 ~ Close : ${cafeData.closingTime}:00`;
  const cafeLogoImage = cafeData.logo;

  return (
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
  );
};

export default ReservationScreen;
