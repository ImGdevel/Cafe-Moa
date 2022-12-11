import * as Location from "expo-location";
import { GoogleMapApiKey } from "../FireServer";

export function RandomLandL(){
    var sample1 = Math.floor(Math.random() * 9999);
    var sample2 = Math.floor(Math.random() * 9999);
    var latitude = Number( "37.2" + sample1.toString());
    var longitude = Number("127.1" + sample2.toString());
    let location = {latitude: latitude, longitude: longitude};
    return location;
}


/** 사용자 현위치 값 리턴 */
export async function getGeoLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
    //const { coords:{latitude, longitude} } = await Location.getCurrentPositionAsync({accuracy: 100});
    let {latitude: latitude, longitude: longitude} = RandomLandL();
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    const address = {city1: location[0].region, city2: location[0].city, city3:location[0].district, city4: (location[0].street) || (location[0].name), city5:(location[0].streetNumber||location[0].postalCode)}
    const text = `${address.city1||""} ${address.city2||""} ${address.city3||""} ${address.city4||""} ${address.city5 || ""}`

    return {latitude:latitude, longitude:longitude, address:address, adressText:text};
}

/** 위도 경도 좌표를 받아 지역 주소를 리턴합니다. */
export async function getAddressFromLocation(_location){
    let {latitude, longitude} = _location;
    let mApiKey = GoogleMapApiKey;
    let adress;
    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + latitude + ',' + longitude + '&key=' + mApiKey + '&language=ko')
        .then((response) => response.json()).then((responseJson) => {
        adress = responseJson.results[0].formatted_address;
        }).catch((err) => console.log("주소를 불러오는 도중 문제가 발생하였습니다 ( 오류코드 - " + err ,")"));
        
    var city_name = adress.split(" ");
    console.log("지역 정보 호출중...:", city_name ,"돈나간다...");
    const text = `${city_name[1]||""} ${city_name[2]||""} ${city_name[3]||""} ${city_name[4]||""} ${city_name[5] || ""}`

    return {city1: city_name[1]||null, city2: city_name[2]||null, city3:city_name[3]||null, city4:city_name[4]||null, city5:city_name[5]||null, text:text};
}