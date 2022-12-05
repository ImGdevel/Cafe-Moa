import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import { signOut } from "../../lib/AuthService";

import getDeleteUserStyle from "../../styles/screens/DeleteUserStyle";

function DeleteUserScreen({ navigation }) {
  function DeleteUser() {
    signOut();
    navigation.replace("Auth");
  }

  return (
    <View style={getDeleteUserStyle.container}>
      <Text style={getDeleteUserStyle.endHeader}>
        계정을 탈퇴하시겠습니까 ?
      </Text>
      <TouchableOpacity onPress={DeleteUser}>
        <Text style={getDeleteUserStyle.ConfirmBoxInText}>
          {"\n\t\t\t\t\t\t"}▶ 계정 탈퇴하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default DeleteUserScreen;
