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
import Ionicons from "react-native-vector-icons/Ionicons";

import getManageStyle from "../../styles/screens/ReserveManageStyle";

function ReserveManageScreen({ navigation }) {
  const [selectedSeat, setSelectedSeat] = useState("");
  const [seatList, setSeatList] = useState([]);
  const [manageVisible, setManageVisible] = useState(false);

  useEffect(() => {
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

  return (
    <ScrollView style={getManageStyle.container}>
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
      <View>
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>11시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          <TouchableOpacity
            style={getManageStyle.setNumBox}
            onPress={() => {
              setManageVisible(!manageVisible);
            }}
          >
            <Text style={{ color: "#001D44" }}>7번 좌석</Text>
          </TouchableOpacity>
          {manageVisible && (
            <View style={getManageStyle.manageMenuContiner}>
              <TouchableOpacity style={getManageStyle.manageMenu}>
                <Text>
                  <Ionicons
                    name="checkmark-sharp"
                    style={{ fontSize: 30, color: "lightgreen" }}
                  ></Ionicons>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={getManageStyle.manageMenu}>
                <Text>
                  <Ionicons
                    name="close-sharp"
                    style={{ fontSize: 30, color: "red" }}
                  ></Ionicons>
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={getManageStyle.setNumBox}>
            <Text style={{ color: "#001D44" }}>8번 좌석</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>12시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          <View>
            <TouchableOpacity style={getManageStyle.setNumBox}>
              <Text style={{ color: "#001D44" }}>7번 좌석</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

export default ReserveManageScreen;
