import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, View, Text, ScrollView } from "react-native";

import getOptionStyle from "../../styles/screens/OptionStyle";
import IonIcons from "react-native-vector-icons/Ionicons";

function MyPageScreen({ navigation }) {
  return (
    <ScrollView style={getOptionStyle.container}>
      <View style={getOptionStyle.subtitleHeader}>
        <Text sytle={{ fontSize: 20 }}>일반</Text>
      </View>
      <TouchableOpacity style={getOptionStyle.optionBtn}>
        <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
          <IonIcons
            name="notifications-circle-outline"
            style={{ fontSize: 20, color: "#001D44" }}
          ></IonIcons>
          {"\t"}푸시 알림
        </Text>
        <Text style={{ color: "#bbb" }}>푸시 알림 수신 기능 On/Off</Text>
      </TouchableOpacity>
      <TouchableOpacity style={getOptionStyle.optionBtn}>
        <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
          <IonIcons
            name="contrast-outline"
            style={{ fontSize: 20, color: "#001D44" }}
          ></IonIcons>
          {"\t"}테마
        </Text>
        <Text style={{ color: "#bbb" }}>라이트모드 / 다크 모드</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default MyPageScreen;
