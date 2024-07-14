import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Switch,
} from "react-native";

import getOptionStyle from "../../styles/screens/OptionStyle";
import IonIcons from "react-native-vector-icons/Ionicons";

function OptionScreen({ navigation, route }) {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isDarkEnabled, setIsDarkEnabled] = useState(false);
  const PushNotiSwitch = () =>
    setIsPushEnabled((previousState) => !previousState);
  const ThemeSwitch = () => setIsDarkEnabled((previousState) => !previousState);

  return (
    <ScrollView style={getOptionStyle.container}>
      <View style={getOptionStyle.subtitleHeader}>
        <Text sytle={{ fontSize: 20 }}>일반</Text>
      </View>
      <View style={getOptionStyle.optionBtn}>
        <View>
          <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
            <IonIcons
              name="notifications-circle-outline"
              style={{ fontSize: 24, color: "#001D44" }}
            ></IonIcons>
            {"\t"}푸시 알림
          </Text>
          <Text style={{ color: "#bbb" }}>푸시 알림 수신 기능 On/Off</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPushEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={PushNotiSwitch}
          value={isPushEnabled}
        />
      </View>
      {/* <View style={getOptionStyle.optionBtn}>
        <View>
          <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
            <IonIcons
              name="contrast-outline"
              style={{ fontSize: 20, color: "#001D44" }}
            ></IonIcons>
            {"\t"}테마
          </Text>
          <Text style={{ color: "#bbb" }}>라이트모드 / 다크 모드</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={ThemeSwitch}
          value={isDarkEnabled}
        />
      </View> */}
    </ScrollView>
  );
}

export default OptionScreen;
