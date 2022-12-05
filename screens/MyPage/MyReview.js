import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
} from "react-native";

import getMyReviewStyle from "../../styles/screens/MyReviewStyle";

import Ionicons from "react-native-vector-icons/Ionicons";
import { getCafeDatas } from "../../lib/CafeService";

function MyReviewScreen({ navigation, route }) {
  const { userData: userData } = route.params;

  return (
    <View style={getMyReviewStyle.container}>
      <View style={getMyReviewStyle.contentContainer}>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
}

export default MyReviewScreen;
