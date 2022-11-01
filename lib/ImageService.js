import * as ImagePicker from "expo-image-picker";
import { storageService } from "../FireServer";

export const getImage = async (cafeId,type) => {
  let url = "";
  try {
    const imageRef = storageService.ref(`${cafeId}/${type}`);
    url = await imageRef.getDownloadURL();
    return url;
  } catch (e) {
    console.log(e);
  }
};

export const pickImage = async (cafeId,type,sizew =1,sizey=1) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [sizew, sizey],
    quality: 1,
  });
  
  if (!result.cancelled) {
    /**이미지를 파이어 배이스로!*/
    uploadImage(cafeId,type,result.uri)
  }
};

export const uploadImage = async (cafeId,type,image) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", image, true);
    xhr.send(null);
  });

  const ref = storageService.ref().child(`${cafeId}/${type}`);
  ref.put(blob);
};


//이미지 업로드시 필요한것 => 카페 아이디