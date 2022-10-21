import { CafeData } from "./CafeData";
import { getAddressFromLocation } from "./Database";


export async function getRandomCafeData(){
    var city = RandomLandL();
    const cafeAd = await getAddressFromLocation(city);
    
    const strArray = ['스타벅스', '공차', '엔젤리너스', '커핀그루나르', '매가', '백다방'];
    const randomValue = strArray[Math.floor(Math.random() * strArray.length)];
    
    var cafe = new CafeData(randomValue,randomValue,city,cafeAd,45);

    return new Promise((resolve) => {
        resolve(cafe);
    });
}

export function RandomLandL(){
    var sample1 = Math.floor(Math.random() * 9999);
    var sample2 = Math.floor(Math.random() * 9999);
    var latitude = Number( "37.2" + sample1.toString());
    var longitude = Number("127.1" + sample2.toString());
    let location = {latitude: latitude, longitude: longitude};
    return location;
}