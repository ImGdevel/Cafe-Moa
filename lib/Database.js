import { dbService } from '../FireServer';
import { List, PriorityQueue, Queue } from './DataStructure/List';
import { getAddressFromLocation } from './LocationService';

const CafeDatabase = dbService.collection("CafeData");
const LocationDatabase = dbService.collection("Location");
const TestDatabase = dbService.collection("Test");

export function testings(){
    
}


/*__________________________________________________________________________ */
/** 데이터베이스에 데이터 추가 */
export async function addCafeDatabase(_data){
    if(_data === null || _data.name === null || _data.location === null){
        // 필수 데이터 검사 후 요청
        console.log("정보가 부족합니다!");
        return;
    }
    let cafe_datas = _data;
    let location = _data.location;
    
    let city = (cafe_datas.adress == null) ? await getAddressFromLocation(location) : cafe_datas.adress;
    cafe_datas.adress = city;
    let data = ((await serchNearestCafe(location,city)).heap);
    data.shift();
    cafe_datas.network = data;
    /*
    var time0 = new TimeTable();
    var time9 = time0.insertOneTimeArray(9);
    var time10 = time0.insertOneTimeArray(10);
    var time11 = time0.insertOneTimeArray(11); 
    var time12 = time0.insertOneTimeArray(12); 
    var time13 = time0.insertOneTimeArray(13); 
    var time14 = time0.insertOneTimeArray(14); 
    var time15 = time0.insertOneTimeArray(15); 
    var time16 = time0.insertOneTimeArray(16); 
    var time17 = time0.insertOneTimeArray(17); 
    var time18 = time0.insertOneTimeArray(18); 
    var time19 = time0.insertOneTimeArray(19); 
    var time20 = time0.insertOneTimeArray(20); 
    // 아래는 사용 예시, 현재 가능
    //time0.insertSeat(11, 30); 
    //time0.deleteSeat(11, 11);
    //time11 = time0.getTime(11); 
    //insert, delete, getTime 구현 가능
    */

    var id = await CafeDatabase.add({
        name: cafe_datas.name,
        location:cafe_datas.location,
        adress: cafe_datas.adress,
        count: cafe_datas.count,
        network: cafe_datas.network,
        /*
        time: {
            // 아래는 성공한 것들 예시, 삭제 금지
            // time: cafe_datas.seat.timeArray,  //이것도 성공 
            //9:time9, 성공(위랑 합쳐서) var time9 = cafe_datas.seat.timeArray;
            //10: cafe_datas.seat10, //성공

            9: time9, 
            10: time10,
            11: time11,
            12: time12,
            13: time13,
            14: time14,
            15: time15,
            16: time16,
            17: time17,
            18: time18,
            19: time19,
            20: time20,
        }
        */
    })
    insertDataInLocation(city,location,id.id);
    if(data != false){
        cafe_datas.network.forEach(element => {
            updateCafeNetwork(element, id.id);
        });
    }
}

/** 지역정보에 카페 아이디 등록 */
export async function insertDataInLocation(_city, _loc, _id){
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

/** 거리계산 */
function getDistance(point_from, point_to){
    return (Math.abs(point_from.latitude-point_to.latitude)+Math.abs(point_from.longitude-point_to.longitude))
}

/*__________________________________________________________________*/

/** 데이터 배이스에서 카페정보를 배열로 리턴*/
export async function getCafeDatabase(_loc){
    let location = _loc;
    let current_adress = await getAddressFromLocation(location);
    let queue = await serchNearestCafe(location,current_adress);
    return bfsSerch(queue);
}

/** 지역 정보로 간단히 가져오기 */
export async function getCafeDatabase2(_loc){
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
   console.log("데이터 로드 성공");
    return cafe_datas.nodes;
}