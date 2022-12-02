import { dbService } from "../FireServer";
import { CafeData } from "./CafeData";
import { getImage, pickImage } from "./ImageService";
import { getAddressFromLocation } from "./LocationService";


export async function getRandomCafeData(){
    var loc = RandomLandL();
    const cafeAd = await getAddressFromLocation(loc);
    const strArray = ['스타벅스','투썸 플레이스', '이디야' ,'엔젤리너스','백다방','카페베이'];
    const randomValue = strArray[Math.floor(Math.random() * strArray.length)];
    const seatCount = 12 + parseInt(Math.random() * 10)
    const visitorCount = 12 + parseInt(Math.random() * 10)
    const randomRating = 1 + (Math.random() * 4)
    
    
    const randomReview = null;

    var cafe = new CafeData(randomValue,loc,cafeAd,seatCount,9,22);
    cafe.setRating(randomRating);
    cafe.setReview(randomReview);
    cafe.setvisitors(visitorCount)
    
    return new Promise((resolve) => {
        resolve(cafe);
    });
}

/** 무작위 카페 데이터를 생성합니다. 배열이며 class CafeData의 객체가 들어있습니다. 
 * CafeData 객체에 대한 설명은 CafeData.js를 확인하세요*/
export async function sample_CafeData(){
    const strArray = ['스타벅스','투썸 플레이스', '이디야' ,'엔젤리너스','백다방','카페베이'];
    let randomValue;
    const cafeAd = {city1: "경기도" , city2: "용인시", city3:"처인구"};
    for(var i=0; i<30;i++){
        randomValue = strArray[Math.floor(Math.random() * strArray.length)];
        seatCount = 10 + Math.floor(Math.random() * 30)
        data.push(new CafeData(randomValue,randomValue,{latitude:37,longitude:125}, cafeAd, seatCount,9,22));
    }
    return data;
}

export async function sample_User(){
    return {
        uid: userId,
        Name: name,
        email: email,
        password: password,
        reservation : {
            cafeId : null,
            seatId: null,
            time : 10,
            seatNumber : 2,
        }
    }
}

export function RandomLandL(){
    var sample1 = Math.floor(Math.random() * 9999);
    var sample2 = Math.floor(Math.random() * 9999);
    var latitude = Number( "37.2" + sample1.toString());
    var longitude = Number("127.1" + sample2.toString());
    let location = {latitude: latitude, longitude: longitude};
    return location;
}


export async function Updated(){
    console.log("업데이트 시작")
    let datalsit = []
    await dbService.collection("CafeData").get().then((docs)=>{
        docs.forEach((data)=>{
            datalsit.push(data.id)
        })
    })

    datalsit.map(async(id)=>{
        await dbService.collection("CafeData").doc(id).update({
            notice: "",
        })
    })
    console.log("업데이트 끝");
}