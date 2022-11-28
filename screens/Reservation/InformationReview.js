import React, { useState } from "react";
import { TextInput, View, StyleSheet, Button, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, } from "react-native";
import Stars from "react-native-stars";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CafeTable } from "../../Components/CafeTable";


function ReviewScreen({ navigation , route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [text, setText] = useState("");
  const [star, setStar] = useState();
  const [image, setImage] = useState("");
  const [starText, setStarText] = useState();

  const ImagePick = () => {
    console.log("!")

  }

  const submitAndClear = () => {    
    // 리뷰 전송
    console.log(text);
    console.log(star);

    setText("");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      >
      <ScrollView style={styles.viewContainer}>
        <CafeTable
          cafeData={cafeData}
          userData={userData}
        />
        <View style={styles.ratingContainer}>
          <Stars
            half={true}
            default={0}
            update={(val) => {
              console.log(val)
              setStar(val);
            }}
            spacing={4}
            starSize={40}
            count={5}
            fullStar={
              <Ionicons name="star" style={[styles.myStarStyle]}></Ionicons>
            }
            emptyStar={
              <Ionicons
                name="star-outline"
                style={[styles.myStarStyle, styles.myEmptyStarStyle]}
              ></Ionicons>
            }
            halfStar={
              <Ionicons
                name="star-half"
                style={[styles.myStarStyle]}
              ></Ionicons>
            }
          />
        </View>
        <TouchableOpacity style={styles.imageContainer}
          onPress={ImagePick}
        >
            <Image source={{uri:{image}}}/>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setText( text )}
          value={text}
          placeholder="리뷰를 입력하세요"
          numberOfLines={5}
          multiline={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={submitAndClear}
          
        >
          <Text style ={{color: "white", fontSize: 20, fontWeight: "700"}}>리뷰 작성하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },

  viewContainer: {
    width: "100%",
    flex: 3,
    height: 55,
    flexDirection: "column",
    backgroundColor: "white",
  },

  imageContainer: {
    fontSize: 18,
    flexShrink: 1,
    height: 100,
    margin: 10,
    marginHorizontal: "5%",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 0,
  },
  ratingContainer: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  myStarStyle: {
    fontSize: 35,
    color: "gold",
  },
  myEmptyStarStyle: {
    color: "#ccc",
  },
  textInput: {
    fontSize: 18,
    flexShrink: 1,
    height: 150,
    margin: 10,
    marginHorizontal: "5%",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 15,
    padding: 15,
  },

  button: {
    marginHorizontal:"5%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent:"center",
    alignSelf:"center",
    marginBottom: 10,
    height: 53,
    width: "80%",
    backgroundColor: "#001D44",
  },
});

export default ReviewScreen;
