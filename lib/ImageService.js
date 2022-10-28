import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storageService } from "../../FireServer";

const [image, setImage] = useState(null);

const getImage = async (key) => {
  let url = "";
  try {
    const imageRef = await storageService.ref("Pictures/Image2");
    url = await imageRef.getDownloadURL();
    console.log("imageUrl:", url);
    return url;
  } catch (e) {
    console.log(e);
  }
};

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  console.log(result);

  //이 이미지를 파이어 배이스로!
  if (!result.cancelled) {
    setImage(result.uri);
  }
};

const uploadImage = async () => {
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

  const ref = storageService.ref().child(`Pictures/Image3`);
  ref.put(blob);
};
