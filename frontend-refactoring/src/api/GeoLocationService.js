import * as Location from 'expo-location';

class GeoLocationService {
  constructor() {
    this.location = null;
    this.errorMsg = null;
  }

  async getGeoLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        this.errorMsg = '위치 권한을 허용해주세요.';
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      this.location = location;
      return location;
    } catch (error) {
      console.error('Error fetching location:', error);
      this.errorMsg = '위치 정보를 가져오는 중 오류가 발생했습니다.';
      return null;
    }
  }

  getLocationData() {
    let data = {
      location: this.location,
      errorMsg: this.errorMsg,
    };
    return data;
  }
}

export default new GeoLocationService();
