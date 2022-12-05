import * as ImagePicker from "expo-image-picker";
import { storageService } from "../FireServer";


/** 이미지를 가벼옵니다. 카테고리/아이디/이미지이름 ex) Cafe, Xis13dDwe2d2ds21, Logo */
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

/** 이미지를 선택합니다. */
export const pickImage = async (sizew =1,sizey=1, mod =true) => {
  if (Platform.OS !== "web") {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission Denied.");
      return;
    }
  }
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: mod,
    aspect: [sizew, sizey],
    quality: 1,
  });

  return new Promise((resolve, reject) => {
    if(!result.canceled){
      resolve(result.assets[0].uri);
      return result.assets[0].uri;
    }else{
      console.log("이미지를 가져오지 못했습니다.")
      reject();
    }
  })
};

/** 서버에 이미지를 업로드 합니다 */
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