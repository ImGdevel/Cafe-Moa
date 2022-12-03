import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import getDeleteUserStyle from "../../styles/screens/DeleteUserStyle";

function DeleteUserScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => GoToHomeScreen(), 1500);
  }, []);

function GoToHomeScreen() {
    navigation.navigate("홈");
  }

  return (
    <View style={getDeleteUserStyle.container}>
      <Text style={getDeleteUserStyle.endHeader}>
        계정을 탈퇴하시겠습니까 ?
      </Text>
      <TouchableOpacity
              onPress={() => {
                navigation.navigate("Auth", {

                });
              }}
            >
              <Text style={getDeleteUserStyle.ConfirmBoxInText}>
                {"\n\t\t\t\t\t\t"}▶ 계정 탈퇴하기
              </Text>
            </TouchableOpacity>
    </View>
  );
}

export default DeleteUserScreen;
