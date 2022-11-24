import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

function WriteNoticeScreen({ navigation }) {
  const [text, onChangeText] = useState();

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          numberOfLines={5}
          placeholder="공지를 작성하세요"
          multiline={true}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          width: "50%",
          height: 40,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: 20 }}>
            작성 완료
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    flexShrink: 1,
    height: 250,
    margin: 12,
    marginTop: 40,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 15,
    padding: 10,
  },
  button: {
    height: "100%",
    width: "100%",
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export default WriteNoticeScreen;
