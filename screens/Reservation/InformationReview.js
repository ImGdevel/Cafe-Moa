import React, { Component, useState } from "react";
import { AppRegistry, TextInput, View, StyleSheet, Button } from "react-native";
import Stars from "react-native-stars";
import Ionicons from "react-native-vector-icons/Ionicons";


function ReviewScreen({ navigation }) {
  const [text, setText] = useState("");
  const [star, setStar] = useState();
  const [starText, setStarText] = useState();

  const submitAndClear = () => {
    setText(text);
    setText("");
  };

  return (
    <View style={styles.viewContainer}>
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
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setText( text )}
        value={text}
        placeholder="리뷰를 입력하세요"
        numberOfLines={5}
        multiline={true}
      />
      <Button
        style={styles.button}
        onPress={submitAndClear}
        title="리뷰 저장하기"
        color="#001D44"
      />
    </View>
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
  ratingContainer: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-end",
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
    height: 200,
    margin: 10,
    marginHorizontal: "5%",
    marginTop: 40,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 15,
    padding: 15,
  },

  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#ccc",
    alignItems: "center",
    marginHorizontal: "2%",
    marginBottom: 5,
    height: 40,
    width: "80%",
    minWidth: "29%",
    textAlign: "center",
  },
});

export default ReviewScreen;
