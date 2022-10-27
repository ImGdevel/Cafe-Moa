import { CafeData } from "./CafeData";
import { getAddressFromLocation } from "./LocationService";


export async function getRandomCafeData(){
    var loc = RandomLandL();
    const cafeAd = {city1: "경기도" , city2: "용인시", city3:"처인구"} //await getAddressFromLocation(loc);
    const strArray = ['스타벅스','공차','엔젤리너스','매가','백다방', '이디야','커피빈','투썸 플레이스','카페베너'];
    const randomValue = strArray[Math.floor(Math.random() * strArray.length)];
    var cafe = new CafeData(randomValue,randomValue,loc,cafeAd,45,9,22);
    return new Promise((resolve) => {
        resolve(cafe);
    });
}

/** 무작위 카페 데이터를 생성합니다. 배열이며 class CafeData의 객체가 들어있습니다. 
 * CafeData 객체에 대한 설명은 CafeData.js를 확인하세요*/
export async function sample_CafeData(){
    const strArray = ['스타벅스','공차','엔젤리너스','매가','백다방', '이디야','커피빈','투썸 플레이스','카페베너'];
    let randomValue;
    const cafeAd = {city1: "경기도" , city2: "용인시", city3:"처인구"}
    
    let data = new Array();

    for(var i=0; i<30;i++){
        randomValue = strArray[Math.floor(Math.random() * strArray.length)];
        seatCount = 10 + Math.floor(Math.random() * 30)
        data.push(new CafeData(randomValue,randomValue,{latitude:37,longitude:125}, cafeAd, seatCount,9,22));
    }

    return data;
}

export function RandomLandL(){
    var sample1 = Math.floor(Math.random() * 9999);
    var sample2 = Math.floor(Math.random() * 9999);
    var latitude = Number( "37.2" + sample1.toString());
    var longitude = Number("127.1" + sample2.toString());
    let location = {latitude: latitude, longitude: longitude};
    return location;
}
