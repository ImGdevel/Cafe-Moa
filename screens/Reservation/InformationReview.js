import React, { Component } from "react";
import { AppRegistry, TextInput, View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";

export default class ChangeText extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  submitAndClear = () => {
    this.props.writeText(this.state.text);

    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="리뷰를 입력하세요"
        />
        <Button
          style={styles.button}
          onPress={this.submitAndClear}
          title="리뷰 저장하기"
          color="#001D44"
        />
      </View>
    );
  }
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
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 20,
    margin: 10,
    borderRadius: 20,
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
    minWidth: "29%",
    textAlign: "center",
  },

});

AppRegistry.registerComponent("clear-text", () => ChangeText);