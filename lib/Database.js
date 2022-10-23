import { dbService, GoogleMapApiKey } from '../FireServer';
import { List, PriorityQueue, Queue } from './List';
import * as Location from "expo-location";
import { getUserId } from './Auth';

const UserDatabase = dbService.collection("User");
const CafeDatabase = dbService.collection("CafeData");
const LocationDatabase = dbService.collection("Location");

export function testings(){

}

/*__________________________________________________________________*/

/** 데이터 배이스에서 카페정보를 배열로 리턴*/
export async function getCafeDatabase(_loc){
    let location = _loc;
    let current_adress = await getAddressFromLocation(location);
    let queue = await serchNearestCafe(location,current_adress);

    return bfsSerch(queue);
}

/** 현 포인트에서 가장 가까운 카페 탐색*/
async function serchNearestCafe(_loc,_city){
    let p_queue = new PriorityQueue();
    let location = _loc, city = _city;
    if(location == false){
        console.log("도시정보 없음")
        location = getAddressFromLocation(_loc);
    }
    await LocationDatabase.doc(city.city1).collection(city.city2).get().then((docs)=>{
        docs.forEach((doc)=>{
            if(doc.exists){
                var data = doc.data();
                var distance = getDistance(data.location,location);
                if(distance < 0.08){
                    p_queue.push(data.id)
                }
            }
        })
    }).catch((err)=>{
        console.log("데이터를 불러 오는데 실패했습니다 : ", err);
    });

    return p_queue;
}


// 너비 그래프 탐색 : ( array:  , numer: 최대숫자 ) 
export async function bfsSerch(start_queue, max){
    let cafe_datas = new List();
    let cafe_list = new List();
    let cafe_queue = new Queue();
    if(max == null) max = 50;

    while(!start_queue.isEmpty()){
        var start_id = start_queue.pop();
        cafe_list.push(start_id);
        cafe_queue.push(start_id);
        await CafeDatabase.doc(start_id).get().then((data)=>{
            cafe_datas.push(data.data());
        });
    }

    //const find = "2z0aFnmkcCIQhasyJAgC"
    /*
    while(!cafe_queue.isEmpty() && cafe_list.length() <= max ){
        console.log(cafe_queue.length());
        var current_node = cafe_queue.front(); 
        var current_node_network_list = await (await CafeDatabase.doc(current_node).get()).data().network
        current_node_network_list.forEach((data) =>{
            console.log(cafe_list.nodes.find((element)=>{
                if(element == )

            }));
        })

        
    }
    */
    return cafe_datas;
}

/*__________________________________________________________________________ */

/** 데이터베이스에 데이터 추가 */
export async function addCafeDatabase(_data){
    if(_data === null || _data.name === null || _data.location === null){
        console.log("정보가 부족합니다!");
        return;
    }
    let cafe_datas = _data;
    let location = _data.location;
    let city = await getAddressFromLocation(location);
    console.log("지역 정보입니다: ", city);

    // 이 코드는 현 지역 데이터중에서 가까운 거리에 카페를 찾아 cafeNetwork를 구축합니다. ****************
    
    let data = ((await serchNearestCafe(location,city)).heap);
    data.shift();
    cafe_datas.network = data;

    var id = await CafeDatabase.add({
        name: cafe_datas.name,
        location:cafe_datas.location,
        adress: cafe_datas.adress,
        count: cafe_datas.count,
        network: cafe_datas.network,
    })

    addLocation(city,location,id.id);
    
    if(data != false){
        cafe_datas.network.forEach(element => {
            updateCafeNetwork(element, id.id);
        });
    }
}

/** 인접 카페 정보 (그래프 노드) 업데이트 */
async function updateCafeNetwork(_setid, _id){
    var tempNet = [];
    await CafeDatabase.doc(_setid).get().then((doc)=>{
        if(doc.exists){
            tempNet = doc.data().network;
            tempNet.push(_id)
        }
    }).catch((err)=>{
        console.log("카페 네트워크를 가져오는데 문제가 발생했습니다 : ", err);
    });
    await CafeDatabase.doc(_setid).update({
        network: tempNet,
    }).catch((err)=>{
        console.log("카페 네트워크를 업데이트 도중 문제가 발생했습니다 : ", err);
    })
}

/*_________________________________________________________________________________*/


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

/** 지역정보에 등록 */
export async function addLocation(_city, _loc, _id){
    const {city1:c1,city2:c2} = _city;
    const {latitude,longitude} = _loc;
    await LocationDatabase.doc(c1).collection(c2).doc(_id).set({
        id: _id,
        location:{
            latitude: latitude,
            longitude: longitude,
        }
    }).catch((err)=>{
        console.log("지역정보를 갱신하는데 문제가 발생했습니다.",err);
    })
}

/** 위도 경도 좌표를 받아 지역 주소를 리턴합니다. */
export async function getAddressFromLocation(_location){
    var {latitude, longitude} = _location;
    var mApiKey = GoogleMapApiKey;
    var adress;

    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' 
            + latitude + ',' + longitude + '&key=' + mApiKey + '&language=ko')
        .then((response) => response.json()).then((responseJson) => {
        console.log(latitude, longitude, "=> (", responseJson.results[0].formatted_address, ")") // 콘솔로그
        adress = responseJson.results[0].formatted_address;
        }).catch((err) => console.log("주소를 불러오는 도중 문제가 발생하였습니다 ( 오류코드 - " + err ,")"));
    var city_name = adress.split(" ");

    return {city1: city_name[1], city2: city_name[2], city3:city_name[3]};
}

/** 거리계산 */
function getDistance(point_from, point_to){
    return (Math.abs(point_from.latitude-point_to.latitude)+Math.abs(point_from.longitude-point_to.longitude))
}

/*_________________________________________________________________________________________*/

export async function signOut(){
    authService.signOut();
}

export async function createUserProfile(user, email, password){
    let userId = user
    if(userId == null){
        userId = await getUserId();
    }
    
    await UserDatabase.doc().set({
        uid: userId,
        Name: "홍길동",
        email: email,
        password: password,
    });
}

export async function updateUserProfile(id, user_profile){

}

export async function getUserProfile(id){

}