import React, { useState, useEffect, createRef } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import getEditProfileStyle from "../../styles/screens/EditProfileStyle";

function EditProfileScreen({ navigation, route }) {
  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const pwInputRef = createRef();

  function ConfirmEditProfile() {
    //navigation.navigate()
  }

  return (
    <KeyboardAvoidingView style={getEditProfileStyle.container}>
      <TouchableOpacity style={getEditProfileStyle.ProfilePicBtn} onPress={{}}>
        <Image
          style={{ width: 180, height: 180 }}
          source={require("../../img/initialProfile.jpg")}
        ></Image>
      </TouchableOpacity>
      <View style={getEditProfileStyle.InputField}>
        <View style={getEditProfileStyle.ChangeBtn}>
          <Text style={getEditProfileStyle.FieldText}>닉네임</Text>
          <TextInput
            ref={nameInputRef}
            style={getEditProfileStyle.textInput}
            placeholder={"닉네임"}
            onChangeText={() => {}}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => {}}
          />
        </View>
        <View style={getEditProfileStyle.ChangeBtn}>
          <Text style={getEditProfileStyle.FieldText}>이메일</Text>
          <TextInput
            ref={emailInputRef}
            style={getEditProfileStyle.textInput}
            placeholder={"이메일"}
            onChangeText={() => {}}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => {}}
          />
        </View>
        <View style={getEditProfileStyle.ChangeBtn}>
          <Text style={getEditProfileStyle.FieldText}>비밀번호</Text>
          <TextInput
            ref={pwInputRef}
            style={getEditProfileStyle.textInput}
            placeholder={"비밀번호"}
            onChangeText={() => {}}
            secureTextEntry={true}
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => {}}
          />
        </View>
      </View>
      <View
        style={{ width: "100%", alignItems: "center", backgroundColor: "#ccc" }}
      >
        <TouchableOpacity
          style={getEditProfileStyle.confirmEditBtn}
          onPress={ConfirmEditProfile}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            개인정보 수정하기
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default EditProfileScreen;
