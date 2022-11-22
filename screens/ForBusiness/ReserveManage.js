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

import getManageStyle from "../../styles/screens/ReserveManageStyle";

function ReserveManageScreen({ navigation }) {
  return (
    <ScrollView style={getManageStyle.container}>
      <View style={getManageStyle.manualContianer}>
        <View style={getManageStyle.descriptionContainer}>
          <Text style={{ fontSize: "18", color: "#001D44" }}>
            수동으로 사용중인 좌석 추가...
          </Text>
          <Text style={{ fontSize: "12", color: "gray" }}>
            예약내역이 있다면, 아래에 표시됩니다.
          </Text>
        </View>
        <View style={getManageStyle.pickerContainer}></View>
        <View style={getManageStyle.addButton}></View>
      </View>
      <View>
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>11시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          <View style={getManageStyle.setNumBox}>
            <Text style={{ color: "#001D44" }}>7번 좌석</Text>
          </View>
          <View style={getManageStyle.setNumBox}>
            <Text style={{ color: "#001D44" }}>8번 좌석</Text>
          </View>
          <View style={getManageStyle.setNumBox}>
            <Text style={{ color: "#001D44" }}>9번 좌석</Text>
          </View>
        </ScrollView>
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>12시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          <View style={getManageStyle.setNumBox}>
            <Text style={{ color: "#001D44" }}>1번 좌석</Text>
          </View>
          <View style={getManageStyle.setNumBox}>
            <Text style={{ color: "#001D44" }}>6번 좌석</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

export default ReserveManageScreen;
