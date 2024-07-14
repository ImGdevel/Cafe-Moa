import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const API_URL = 'http://192.168.219.105:8080/api/images';

const ImageService = {
  selectImage: async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (pickerResult.cancelled) {
      return;
    }

    return pickerResult.assets[0];
  },

  uploadImage: async (image) => {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      console.log('Uploading image to:', API_URL); // 디버그용 로그 추가
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image upload response:', response.data); // 응답 로그 추가
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  getImage: async (filename) => {
    try {
      const response = await axios.get(`${API_URL}/${filename}`, {
        responseType: 'blob',
      });
      console.log('Image fetched successfully:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  },
};

export default ImageService;
