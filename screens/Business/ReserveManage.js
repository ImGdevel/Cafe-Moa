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

function ReserveManageScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [selectedSeat, setSelectedSeat] = useState("");
  const [reserveService, setReserveService] = useState();
  const [seatList, setSeatList] = useState([]);
  const [time, setTime] = useState(new Date().getHours());
  const [timeTable, setTimeTable] = useState();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedReserveSeat, setSelectedReserveSeat] = useState("");

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

  const onTimeSeats = () => {
    reves.getSeatDataOnTimeReserve(time, false);
  };

  const TimeTable = () => {};

  const SeatLabel = () => {};
  const pressButton = (number) => {
    setSelectedReserveSeat(number);
    setModalVisible(true);
  };

  return (
    <ScrollView style={getManageStyle.container}>
      <BottomSheet
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        reserveSeat={selectedReserveSeat}
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
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>11시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          <TouchableOpacity
            style={getManageStyle.setNumBox}
            onPress={() => {
              pressButton(7);
            }}
          >
            <Text style={{ color: "#001D44" }}>7번 좌석</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getManageStyle.setNumBox}
            onPress={() => {
              pressButton(8);
            }}
          >
            <Text style={{ color: "#001D44" }}>8번 좌석</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>12시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          <View>
            <TouchableOpacity
              style={getManageStyle.setNumBox}
              onPress={() => {
                pressButton(7);
              }}
            >
              <Text style={{ color: "#001D44" }}>7번 좌석</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </ScrollView>
  );
}

export default ReserveManageScreen;
