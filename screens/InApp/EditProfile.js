import React, { useState, useEffect, createRef } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import getEditProfileStyle from "../../styles/screens/EditProfileStyle";

function EditProfileScreen({ navigation, route }) {
  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const pwInputRef = createRef();

  function ConfirmEditProfile() {
    navigation.navigate("마이페이지");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={getEditProfileStyle.container}
        behavior="padding"
      >
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <TouchableOpacity
            style={getEditProfileStyle.ProfilePicBtn}
            onPress={{}}
          >
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

          <View style={getEditProfileStyle.confirmContainer}>
            <TouchableOpacity
              style={getEditProfileStyle.confirmEditBtn}
              onPress={ConfirmEditProfile}
            >
              <Text
                style={{ color: "white", fontSize: 20, alignSelf: "center" }}
              >
                개인정보 수정하기
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default EditProfileScreen;
