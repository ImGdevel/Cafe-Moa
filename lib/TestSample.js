import { CafeData } from "./CafeData";
import { getImage, pickImage } from "./ImageService";
import { getAddressFromLocation } from "./LocationService";


export async function getRandomCafeData(){
    var loc = RandomLandL();
    const cafeAd = await getAddressFromLocation(loc);
    const strArray = ['스타벅스','투썸 플레이스', '이디야' ,'엔젤리너스','백다방','카페베이'];
    const randomValue = strArray[Math.floor(Math.random() * strArray.length)];
    var cafe = new CafeData(randomValue,randomValue,loc,cafeAd,45,9,22);
    //cafe.seatImge = getImage("sample/seatImage",randomValue);
    //cafe.Logo = getImage("sample/logo",randomValue);
    cafe.seatImge = true;
    cafe.Logo = true;
    return new Promise((resolve) => {
        resolve(cafe);
    });
}

export async function setSampleImage(index = 5){
    const strArray = ['스타벅스','투썸 플레이스', '이디야' ,'엔젤리너스','백다방','카페베이'];
    
    console.log(strArray[index])
    await pickImage("sample/logo",strArray[index])
    await pickImage("sample/seatImage",strArray[index],4,3)
    
}

export async function sample_CafeData(){
    const strArray = ['스타벅스','엔젤리너스','백다방', '이디야','커피빈','투썸 플레이스'];
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
