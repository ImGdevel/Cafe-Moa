import { dbService } from '../FireServer';
import { CafeData } from './CafeData';
import { List, Queue } from './List';

const UserDatabase = dbService.collection("User");
const CafeDatabase = dbService.collection("CafeData");

export async function getCafeDatabase(location){
    const finded_cafe = new List();
    // 현제 위치를 기반으로 가까운 카페를 찾고
    //startCafe 
    

    finded_cafe.push("asdasd");
    finded_cafe.push("asdasffa");
    
    console.log(finded_cafe.getDataToArray())
    return bfsSerch(start_point);
    //return bfsSerch(/*스타트 주소값*/);
    //결과적으로 찾아낸 데이터들을 리턴한다.
}

//id 기반이라 생각하자

async function bfsSerch(start_point){
    let cafe_queue = new Queue();
    let cafe_list = new List(); // 카페 본진
    let cafe_data = new List();
    cafe_list.push(start_point.uid);
    cafe_queue.push(start_point.uid);
    cafe_data.push(start_point);
    while(!cafe_queue.empty()){
        var current_id = cafe_queue.front();
        var current_node = await CafeDatabase.doc(current_id).get();
        cafe_data.push(current_node);
        console.log(current_node);

        current_node.network.forEach(net => {
            if(!cafe_list.find(net)){
                cafe_list.push(net);
                cafe_queue.push(net);
            }
        });
    }
    return cafe_data;
}

export async function setLocation(){

}

export async function getLocation(){

}


/*____카페 추가 알고리즘________________________________________________________*/

export async function addCafeDatabase(cafe_datas){
    // 이걸로 끝? 아니 지역에 따라 데이터를 가져오자!
    // 지역...에 데이터 배열
    
    cafe_datas.network = await getCafeNetwork(cafe_datas);
    console.log(cafe_datas.network);
    
    var id = await CafeDatabase.add({
        name: cafe_datas.name,
        location:cafe_datas.location,
        adress: cafe_datas.adress,
        count: cafe_datas.count,
        network: cafe_datas.network,
    })


    cafe_datas.network.forEach(element => {
        updateCafeNetwork(element, id.id); 
    });
}

//주변지역 탐색후 주변 카페 정보 인풋
async function getCafeNetwork(_cafe_datas){
    var network = new Array();
    await CafeDatabase.get().then((docs) => {
        docs.forEach((doc) => {
          if(doc.exists){
            network.push(doc.id);
          }
        });
      });
    return network;
}

async function updateCafeNetwork(_setid, _id){
    var tempNet = [];
    await CafeDatabase.doc(_setid).get().then((doc)=>{
        if(doc.exists){
            tempNet = doc.data().network;
            tempNet.push(_id)
        }
    });
    await CafeDatabase.doc(_setid).update({
        network: tempNet,
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



