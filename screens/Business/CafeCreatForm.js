import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import getInputStyle from "../../styles/screens/InputDataStyle";


function CafeCreatFormScreen({ navigation }) {

  function SubmitCreateCafe() {
    navigation.replace("Business");
  }


  return (
    <KeyboardAvoidingView style={getInputStyle.container}>
      <View style={getInputStyle.headerContainer}>
        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#001D44" }}>
          Create MOA Cafe
        </Text>
      </View>
      <View style={getInputStyle.contentContainer}>
        <View style={getInputStyle.cafeInfoHeader}>
          <View style={getInputStyle.cafeImagePicker}>
            <Image
              source={require("../../img/coffeebayLogo_test.jpg")}
              style={{ width: "100%", height: "100%", borderRadius: 15 }}
            />
          </View>
          <View style={getInputStyle.nameInputContainer}>
            <TextInput
              ref={cafeNameInputRef}
              style={getInputStyle.nameTextInput}
              placeholder={"카페이름"}
              onChangeText={(cafeName) => setcCafeName(cafeName)}
              autoCapitalize="none"
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() =>
                cafeLocationInputRef.current &&
                cafeLocationInputRef.current.focus()
              }
            />
            <TouchableOpacity style={getInputStyle.locationButton}>
              <Text
                style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}
              >
                카페 위치
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ width: "100%", height: "5%", backgroundColor: "white" }}
        ></View>
        <View style={getInputStyle.cafeTimeContainer}>
          <View style={getInputStyle.oncTimeContainer}>
            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <Text
                style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}
              >
                Open
              </Text>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                <TextInput
                  ref={cafeOTInputRef}
                  style={getInputStyle.timeTextInput}
                  placeholder={"시간"}
                  onChangeText={(text) => setcCafeName(text)}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    cafeLocationInputRef.current &&
                    cafeLocationInputRef.current.focus()
                  }
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "30%",
              height: "100%",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#001D44", fontSize: 30, fontWeight: "bold" }}
            >
              ~
            </Text>
          </View>
          <View style={getInputStyle.oncTimeContainer}>
            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <Text
                style={{ color: "#001D44", fontSize: 20, fontWeight: "bold" }}
              >
                Close
              </Text>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                <TextInput
                  ref={cafeCTInputRef}
                  style={getInputStyle.timeTextInput}
                  placeholder={"시간"}
                  onChangeText={(text) => setcCafeName(text)}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  blurOnSubmit={false}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    cafeLocationInputRef.current &&
                    cafeLocationInputRef.current.focus()
                  }
                />
              </View>
            </View>
          </View>
        </View>
        <View style={getInputStyle.seatImagePickerContainer}>
          <View style={getInputStyle.setImagePicker}>
            <Image
              source={require("../../img/anySeatPic_text.png")}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </View>
      <View style={getInputStyle.submitBtnContainer}>
        <TouchableOpacity
          style={getInputStyle.submitButton}
          onPress={SubmitCreateCafe}
        >
          <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
            카페 만들기
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default CafeCreatFormScreen;
