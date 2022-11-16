import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import getBusinessHomeStyle from "../../styles/screens/BusinessHomeStyle";

function BusinessHomeScreen({ navigation }) {

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style = {getHomeStyle.TopView}>
        <View style = {getHomeStyle.TopViewTop}>

        </View>
        <View style = {getHomeStyle.TopTitle}>
          <Text style={{ color: "#001D44", fontWeight: "900", fontSize: 60 }}>
            M O A
          </Text>
        </View>
      </View>
      <View style={getBusinessHomeStyle.contentContainer}>
        <View style={getBusinessHomeStyle.btnContainer}>
            <TouchableOpacity style={getBusinessHomeStyle.button}>
                <Text style={{ color: "#001D44", fontWeight: "500", fontSize: 20 }}>카페 관리</Text>
            </TouchableOpacity>
            <TouchableOpacity style={getBusinessHomeStyle.button}>
                <Text style={{ color: "#001D44", fontWeight: "500", fontSize: 20 }}>카페 정보</Text>
            </TouchableOpacity>
        </View>
        <View style={getBusinessHomeStyle.manageReservationWindow}>
            <View style={getBusinessHomeStyle.manageHeader}>
                <Text style={{ color: "#001D44", fontWeight: "500", fontSize: 30 }}>카페 예약 현황</Text>
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default BusinessHomeScreen;