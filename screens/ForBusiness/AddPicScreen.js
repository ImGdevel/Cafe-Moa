import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import Ionicons from "react-native-vector-icons/Ionicons";

function AddPicScreen({ navigation, route }) {
  const [image, setImage] = useState();

  useEffect(() => {
    PermissionLib();
  }, []);

  const PermissionLib = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission Denied.");
      }
    }
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.LogoImagePicker} onPress={PickImage}>
          <Text style={{ color: "#ccc", fontSize: 40 }}>+</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 140, height: 140 }} />
        )}
      </View>
      <TouchableOpacity style={styles.completeButton} onPress={() => {}}>
        <Text style={{ color: "#001D44", fontSize: 20, fontWeight: "900" }}>
          추가 완료하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  LogoImagePicker: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  completeButton: {
    marginTop: 20,
  },
});

export default AddPicScreen;
