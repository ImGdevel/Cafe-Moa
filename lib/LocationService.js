import * as Location from "expo-location";
import { GoogleMapApiKey } from "../FireServer";

/** 사용자 현위치 값 리턴 */
export async function getGeoLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    const { coords:{latitude, longitude} } = await Location.getCurrentPositionAsync({accuracy: 20});
    //const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    return {latitude:latitude, longitude:longitude};
}

/** 위도 경도 좌표를 받아 지역 주소를 리턴합니다. */
export async function getAddressFromLocation(_location){
    let {latitude, longitude} = _location;
    let mApiKey = GoogleMapApiKey;
    let adress;

    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + latitude + ',' + longitude + '&key=' + mApiKey + '&language=ko')
        .then((response) => response.json()).then((responseJson) => {
        //console.log(latitude, longitude, "=> (", responseJson.results[0].formatted_address, ")") // 콘솔로그
        adress = responseJson.results[0].formatted_address;
        }).catch((err) => console.log("주소를 불러오는 도중 문제가 발생하였습니다 ( 오류코드 - " + err ,")"));
    var city_name = adress.split(" ");
    console.log("지역 정보 호출중...:", city_name ,"돈나간다...");
    return {city1: city_name[1], city2: city_name[2], city3:city_name[3]};
}