import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import AuthService from "../services/AuthService"

import getDeleteUserStyle from "../styles/screens/DeleteUserStyle";

function MemberWithdrawnScreen({ navigation }) {
  function DeleteUser() {
    //AuthService... 로그 아웃 구현
    navigation.replace("Auth");
  }

  return (
    <View style={getDeleteUserStyle.container}>
      <Text style={getDeleteUserStyle.endHeader}>탈퇴하시겠습니까 ?</Text>
      <Text></Text>
      <Text
        style={{
          textAlign: "left",
          color: "gray",
        }}
      >
        회원님의 로그인 정보 등 각종 개인정보는 삭제되며,
        {"\n"}복구할 수 없습니다. 계속하시곘습니까?
      </Text>
      <TouchableOpacity
        style={getDeleteUserStyle.ConfirmBox}
        onPress={DeleteUser}
      >
        <Text style={{ fontSize: 15, fontWeight: "500" }}>회원 탈퇴하기▶</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MemberWithdrawnScreen;
