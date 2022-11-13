import * as ImagePicker from "expo-image-picker";
import { storageService } from "../FireServer";


export const getImage = async (collection,cafeId,type) => {
  let url = "";
  try {
    const imageRef = storageService.ref(`${collection}/${cafeId}/${type}`); // cafe 추가
    url = await imageRef.getDownloadURL();
    return url;
  } catch (e) {
    console.log(e);
    return " ";
  }
};

/** 이미지를 가져옵니다. */
export const pickImage = async (sizew =1,sizey=1) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [sizew, sizey],
    quality: 1,
  });

  return new Promise((resolve, reject) => {
    if(!result.cancelled){
      resolve(result.uri);
      return result.uri;
    }else{
      console.log("이미지를 가져오지 못했습니다.")
      reject();
    }
  })
};

export const uploadImage = async (image, collection="Test",cafeId="Sample",type="image") => {
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

  const ref = storageService.ref().child(`${collection}/${cafeId}/${type}`);
  ref.put(blob);
};