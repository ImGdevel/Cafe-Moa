import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BottomSheet from "../../Components/BottomSheet";

import getManageStyle from "../../styles/screens/ReserveManageStyle";
import { dbService } from "../../FireServer";
import { ReservationService } from "../../lib/ReservationService";
import { UserDataService } from "../../lib/UserDataService";

function ReserveManageScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [selectedSeat, setSelectedSeat] = useState("");
  const [reserveService, setReserveService] = useState();
  const [seatList, setSeatList] = useState([]);
  const [time, setTime] = useState(new Date().getHours());
  const [timeTableList, setTimeTableList] = useState();
  const [loadPage, setLoadPage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedReserveSeat, setSelectedReserveSeat] = useState();

  useEffect(() => {
    const reves = new ReservationService(cafeData.getSeatId());
    dbService
      .collection("Seat")
      .doc(cafeData.getSeatId())
      .onSnapshot(async () => {
        await reves.loadSeatDataBase();
        setReserveService(reves);
      });
    makePickerItem();
  }, []);

  // picker item에 추가하는 loop
  const makePickerItem = () => {
    let seatLoop = [];
    for (let i = 1; i <= 20; i++) {
      seatLoop.push(<Picker.Item key={i} label={String(i)} value={i} />);
    }
    setSeatList(seatLoop);
  };
  
  const pressButton = (time,seat) => {
    setSelectedReserveSeat({time,seat});
    setModalVisible(true);
  };

  /** 확인 */
  const AssignmentConfirm = async() => {
    console.log("배정",selectedReserveSeat);
    const data = selectedReserveSeat;
    const fd = await reserveService.assignmentSeats(data.time,data.seat.seat);
    setLoadPage(fd);
    /*
    dbService.collection("User").doc(data.seat.uid).update({
      reservation: {
        state: true,
      },
    })
    */
  }

  const ReservationCancel = async() => {
    const data = selectedReserveSeat;
    const user = new UserDataService(data.seat.uid);
    const fd = await reserveService.doSeatCancel(data.time,data.seat.seat);
    await user.deleteReservationToUser();
    setLoadPage(fd);
  }

  useEffect(()=>{
    if(reserveService == null){
      return;        
    }
    const {open:op, close:cl} = reserveService;
    const arr =[];
    for(var i=op; i< cl; i++){
      arr.push(
        <TimeTable key={i} time={i}/>
      )
    }
    setTimeTableList(arr);
  },[,reserveService, loadPage])

  /** 시간 라벨 */
  function TimeTable({time}){
    const [seatList, setSeatList] = useState([]);

    useEffect(()=>{
      const seats = reserveService.getSeatDataOnTimeReserve(time, false);
      const list = seats.map((data, index)=>{
        return <SeatLabel key={index} seat={data}/>
      })
      setSeatList(list);
    },[,reserveService, loadPage])

    /** 좌석 */
    const SeatLabel = ({seat}) => (
      <TouchableOpacity
        style={getManageStyle.setNumBox}
        onPress={() => { 
          pressButton(time,seat)
        }}
      >
        <Text style={{ color: "#001D44" }}>{`${seat.seat}번 좌석`}</Text>
      </TouchableOpacity>
    )
    return(
      <>
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>{time}시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          {seatList}
        </ScrollView>
      </>
    )
  }

  return (
    <ScrollView style={getManageStyle.container}>
      <BottomSheet
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        reserveSeat={selectedReserveSeat}
        reserveService={reserveService}
        AssignmentConfirm={AssignmentConfirm}
        ReservationCancel={ReservationCancel}
        cafeData={cafeData}
      />
      <View style={getManageStyle.manualContianer}>
        <View style={getManageStyle.descriptionContainer}>
          <Text style={{ fontSize: 18, color: "#001D44" }}>
            수동으로 사용중인 좌석 추가...
          </Text>
          <Text style={{ fontSize: 12, color: "gray" }}>
            예약내역이 있다면, 아래에 표시됩니다.
          </Text>
        </View>
        <View style={getManageStyle.pickerContainer}>
          <Picker
            style={getManageStyle.picker}
            selectedValue={selectedSeat}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedSeat(itemValue);
            }}
          >
            {seatList}
          </Picker>
        </View>
        <View style={getManageStyle.addButtonContainer}>
          <TouchableOpacity style={getManageStyle.addButton}>
            <Text style={{ color: "white" }}>추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {timeTableList}
      </ScrollView>
    </ScrollView>
  );
}

export default ReserveManageScreen;
