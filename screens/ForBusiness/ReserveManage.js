import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

import getManageStyle from "../../styles/screens/ReserveManageStyle";

function ReserveManageScreen({ navigation }) {
  return (
    <ScrollView style={getManageStyle.container}>
      <View style={getManageStyle.manualContianer}></View>
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
