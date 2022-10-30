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
import { CafeData } from "../../lib/CafeData";

function ReservationScreen({ navigation, route }) {
  const {cafeData: cafe_data} = route.params;

  const [cafeData, setCafeData] = useState(cafe_data);
  const [seatImage, setSeatImage] = useState(cafe_data.getSeatImage())
  const [seatData, setSeatData] = useState();
  const [selectedSeat, setSelectedSeat] = useState("1");
  const [modalVisible, setModalVisible] = useState(true);
  const [modalOutput, setModalOutput] = useState("Open Modal");
  const [time, setTime] = useState(0);

  //최대 자릿수 - 현제 예약된 자릿수

  useEffect(()=>{
    
  })

  const notReserveSeat = async() => {
    
  }

  useEffect(()=>{
    SeatTimeTable();
  },[])

  const SeatTimeTable = async() => {
    let timeTable = new ReservationService(cafeData.getSeatId());
    await timeTable.loadSeatDataBase();
    setSeatData(timeTable);
  }




  var timeLoop = [];
  const timeArr = [ "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00","16:00","17:00","18:00","19:00","20:00",];
    
  for (let i = 0; i < timeArr.length; i++) {
    timeLoop.push(
      <TouchableOpacity
        key={i}
        style={getModalStyle.modalButton}
        onPress={() => {
          setModalOutput("선택 1");
          setModalVisible(false);
          setTime(i+cafeData.getOpenTime())
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>{timeArr[i]}</Text>
      </TouchableOpacity>
    );
  } 

  var seatLoop = [];
  const seatArr = ["1", "2", "3", "4", "5", "6"];
  for (let i = 0; i < seatArr.length; i++) {
    seatLoop.push(<Picker.Item key={i} label={seatArr[i]} value={i + 1} />);
  }  

  const submitReservation = async() => {
    let reserveSrv = new ReservationService();
    reserveSrv = seatData;
    if(await reserveSrv.doSeatReservation(time,selectedSeat)){ 
      console.log(cafeData)
      console.log(cafeData.id)
      await sendReservetionToUser(cafeData.id, reserveSrv.seatId, time,selectedSeat)
      navigation.navigate("ReserveEnd");
    }
    
  }


  return (
    <View style={getReserveStyle.container}>
      <Modal
        isVisible={modalVisible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ><>
        <View style={getModalStyle.modalView}>
          <View style={getModalStyle.modalWrapper}>
            <Text style={getModalStyle.modalGradeText}>시간을 선택하세요</Text>
          </View>
          <ScrollView style={getModalStyle.ScrollView}>{timeLoop}</ScrollView>
        </View>
      </>
      </Modal>

      <View style={getFindStyle.container}>
        <View style={getFindStyle.contentContainer}>
          <CafeTable
            cafeData={cafeData}
            navigation={navigation}
          />
        </View>
      </View>

      <View style={getReserveStyle.seatContainer}>
        <Image
          source={{uri:seatImage}}
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
          onValueChange={(itemValue, itemIndex) => {setSelectedSeat(itemValue)}}
        >
          {seatLoop}
        </Picker>

        <TouchableOpacity
          style={getReserveStyle.reserveBtn}
          onPress={submitReservation}
        >
          <Text style={{ color: "white", fontSize: 15 }}>예약하기</Text>
        </TouchableOpacity>
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