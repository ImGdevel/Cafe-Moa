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
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";

import getEditProfileStyle from "../styles/screens/EditProfileStyle";
import getModalStyle from "../styles/components/ModalStyle";

function EditProfileScreen({ navigation, route }) {
  const { userData: userData } = route.params;
  const [image, setImage] = useState();
  const [nickname, setNickname] = useState(userData.getName());
  const [email, setEmail] = useState(userData.getEmail());
  const [passwd, setPasswd] = useState(userData.getPassword());
  const [errorText, setErrorText] = useState("");
  const [isPW, setIsPW] = useState();

  const changeInfoRef = createRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [ph, setPh] = useState("");

  useEffect(() => {
    start();
  }, []);

  async function start() {
    const getimage = await userData.getProfileImage();
    if (getimage == null) {
      setImage(require("@img/initialProfile.jpg"));
    } else {
      setImage({ uri: getimage });
    }
  }

  const PickImage = async () => {
    const imageuri = await pickImage();
    userData.uploadProfileImage(imageuri);
    setImage({ uri: imageuri });
  };

  function checkCorrectPW(text) {
    // 비밀번호가 일치하지 않으면 초기화한다.
    if (text != passwd) {
      setPasswd(userData.getPassword());
      setErrorText("비밀번호가 일치하지 않습니다.");
    }
  }

  function OpenModal() {
    setModalVisible(!modalVisible);
  }

  async function SubmitChange() {
    if (key == 1) {
      // nickname 바꾼 경우
      console.log(nickname);
      await userData.setUserProfile(nickname, email, passwd);
      console.log(userData.getName());
      // } else if (key == 2) {
      //   // email 바꾼 경우
      //   console.log(email);
      //   await userData.setUserProfile(nickname, email, passwd);
      //   console.log(userData.getEmail());
    } else if (key == 3) {
      console.log(passwd);
      await userData.setUserProfile(nickname, email, passwd);
      console.log(userData.getPassword());
    }
    setModalVisible(!modalVisible);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={getEditProfileStyle.container}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <TouchableOpacity
            style={getEditProfileStyle.ProfilePicButton}
            onPress={PickImage}
          >
            <Image
              style={{ width: 180, height: 180, borderRadius: 90 }}
              source={image}
            ></Image>
          </TouchableOpacity>
          <View style={getEditProfileStyle.InputField}>
            <View style={getEditProfileStyle.ChangeButton}>
              <View style={{ flexDirection: "row" }}>
                <Text style={getEditProfileStyle.FieldText}>닉네임 |</Text>
                <Text style={getEditProfileStyle.FieldNextText}>
                  {nickname}
                </Text>
              </View>
              <View style={getEditProfileStyle.confirmContainer}>
                <TouchableOpacity
                  style={getEditProfileStyle.confirmEditButton}
                  onPress={() => {
                    setKey(1);
                    setPh("새 닉네임");
                    setIsPW(false);
                    OpenModal();
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      alignSelf: "center",
                    }}
                  >
                    변경
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={getEditProfileStyle.ChangeButton}>
              <Text style={getEditProfileStyle.FieldText}>이메일</Text>
              <View style={getEditProfileStyle.confirmContainer}>
                <TouchableOpacity
                  style={getEditProfileStyle.confirmEditButton}
                  onPress={() => {
                    setKey(2);
                    setPh("새 이메일");
                    OpenModal();
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      alignSelf: "center",
                    }}
                  >
                    변경
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={getEditProfileStyle.ChangeButton}>
              <View style={{ flexDirection: "row" }}>
                <Text style={getEditProfileStyle.FieldText}>비밀번호 |</Text>
                {/* <Text style={getEditProfileStyle.FieldNextText}>{passwd}</Text> */}
              </View>
              <View style={getEditProfileStyle.confirmContainer}>
                <TouchableOpacity
                  style={getEditProfileStyle.confirmEditButton}
                  onPress={() => {
                    setKey(3);
                    setPh("새 비밀번호");
                    setIsPW(true);
                    OpenModal();
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 15,
                      alignSelf: "center",
                    }}
                  >
                    변경
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal
                isVisible={modalVisible}
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <>
                  <View style={getEditProfileStyle.modalView}>
                    <View style={getModalStyle.modalWrapper}>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 20,
                          color: "black",
                        }}
                      >
                        개인정보수정
                      </Text>
                    </View>
                    <View style={getModalStyle.ScrollView}>
                      <TextInput
                        ref={changeInfoRef}
                        style={getEditProfileStyle.textInput}
                        placeholder={ph}
                        onChangeText={(text) => {
                          if (key == 1) {
                            // nickname 바꾼 경우
                            setNickname(text);
                            // } else if (key == 2) {
                            //   // email 바꾼 경우
                            //   setEmail(text);
                          } else if (key == 3) {
                            setPasswd(text);
                          }
                        }}
                        secureTextEntry={isPW}
                        autoCapitalize="none"
                      />
                      {key === 3 && (
                        <TextInput
                          ref={changeInfoRef}
                          style={getEditProfileStyle.textInput}
                          placeholder={"새 비밀번호 확인"}
                          onChangeText={(text) => checkCorrectPW(text)}
                          secureTextEntry={true}
                          autoCapitalize="none"
                        />
                      )}
                      <Text>{errorText}</Text>
                    </View>
                    <View style={getEditProfileStyle.btnArea}>
                      <TouchableOpacity
                        style={getEditProfileStyle.modalButton}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Text style={{ color: "black", fontSize: 15 }}>
                          취소
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={getEditProfileStyle.modalButton}
                        onPress={SubmitChange}
                      >
                        <Text style={{ color: "black", fontSize: 15 }}>
                          변경
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default EditProfileScreen;
