import { DatePickerAndroid } from 'react-native';
import { dbService, GoogleMapApiKey } from '../FireServer';
import { CafeData } from './CafeData';
import { List, Queue } from './List';

const UserDatabase = dbService.collection("User");
const CafeDatabase = dbService.collection("CafeData");
const LocationDatabase = dbService.collection("Location");

export async function testings(){

}

/*__________________________________________________________________*/
export async function getCafeDatabase(){
    // 현제 위치를 기반으로 가까운 카페를 찾고
    // startCafe 
    console.log("Test");
    bfsSerch(start_point);
}

//id 기반이라 생각하자
export async function bfsSerch(start_point){
    

    while(!cafe_queue.isEmpty()){
        /*
        var current_id = cafe_queue.front();
        console.log("serch...")
        //var current_node = await CafeDatabase.doc(current_id).get();
        cafe_data.push(current_node);
        console.log(current_node);
        /*
        current_node.network.forEach(net => {
            if(!cafe_list.find(net)){
                cafe_list.push(net);
                cafe_queue.push(net);
            }
        });
        */
    }
    
    console.log(cafe_data);
}


export async function addLocation(_city, _loc, _id){
    const {city1:c1,city2:c2,city3:c3} = _city;
    const {latitude,longitude} = _loc;
    await LocationDatabase.doc(c1).collection(c2).doc(_id).set({
        id: _id,
        latitude: latitude,
        longitude: longitude,
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

/*____카페 추가 알고리즘________________________________________________________*/
export async function addCafeDatabase(_data){
    let cafe_datas = new CafeData();
    let cafe_locations = false;
    cafe_datas = _data;

    /** 데이터 유효 검사 */
    if(cafe_datas.name === null || cafe_datas.location === null){
        console.log("정보가 부족합니다!");
        return;
    }

    /** 지역정보 추출*/
    var city = await getAddressFromLocation(cafe_datas.location);
    console.log("지역 정보입니다: ", city);

    /** 이 코드는 현 지역 데이터중에서 가까운 거리에 카페를 찾아 cafeNetwork를 구축합니다. */
    await LocationDatabase.doc(city.city1).collection(city.city2).get().then(async (loc)=>{
        var cafe_adress = city;
        cafe_locations = true;

    }).catch((error)=>{
        console.log("네트워크를 불러오던중 발생했습니다. "+ error);
        cafe_locations = false;
        cafe_datas.network = [];
    })
    //cafe_datas.network = await getCafeNetwork(cafe_adress);

    var id = await CafeDatabase.add({
        name: cafe_datas.name,
        location:cafe_datas.location,
        adress: cafe_datas.adress,
        count: cafe_datas.count,
        network: cafe_datas.network,
    })


    addLocation(city,cafe_datas.location,id.id);
    
    if(cafe_locations == true){
        cafe_datas.network.forEach(element => {
            updateCafeNetwork(element, id.id);
        });
    }
}

/** 인접 카페 정보 (그래프 노드) 가져오기 */
async function getCafeNetwork(_adress){
    var network = new Array();
    await LocationDatabase.doc(_adress).get().then((docs) => {
        docs.forEach((doc) => {
          if(doc.exists){
            network.push(doc.id);
          }else{
            console.log("인접 데이터가 존재하지 않습니다.");
          }
        });
      })
    return network;
}

/** 인접 카페 정보 (그래프 노드) 업데이트 */
async function updateCafeNetwork(_setid, _id){
    var tempNet = [];
    await LocationDatabase.doc(_setid).get().then((doc)=>{
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
/*_______________________________________________________________*/
export async function updateCafeDatabase(id,_cafe_data){
    await CafeDatabase.doc(id).update({

    })
}

function getDistance(a_latitude, a_longitude, b_latitude, b_longitude){
    return (Math.abs(a_latitude-b_longitude)+Math.abs(b_latitude-b_longitude))
}

export async function createUserProfile(user){
    console.log(user.uid)
    await UserDatabase.doc(user.uid).set({
        userId: user.uid,
        email: user.email,
        password: user.password,
    })
}

export async function updateUserProfile(id, user_profile){

}

export async function getUserProfile(id){

}