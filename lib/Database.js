import { dbService } from '../FireServer';
import { CafeData } from './CafeData';
import { List, Queue } from './List';

const UserDatabase = dbService.collection("User");
const CafeDatabase = dbService.collection("CafeData");

export async function getCafeDatabase(){
    const finded_cafe = new List();
    // 현제 위치를 기반으로 가까운 카페를 찾고
    //startCafe 


    finded_cafe.pushNode("asdasd");
    finded_cafe.pushNode("asdasffa");
    
    console.log(finded_cafe.getDataToArray())

    //return bfsSerch(/*스타트 주소값*/);
    //결과적으로 찾아낸 데이터들을 리턴한다.
    
}

//id 기반이라 생각하자

async function bfsSerch(start_point){
    let cafe_queue = new Queue();
    let cafe_list = new List(); // 카페 본진
    cafe_list.pushNode(start_point);
    cafe_queue.pushNode(start_point);
    while(!cafe_queue.empty()){
        var current_id = cafe_queue.front();
        var current_node = await CafeDatabase.doc(current_id).get();
        console.log(current_node);

        current_node.network.forEach(net => {
            if(cafe_list.find(net)){
                
            }
        });

        // pop(); 맨 처음에 넣은거 넣은거 빼고 
        //현제 노드의 데이터 배열을 받는다. 현제 quque에 팝
        
        // 데이터 배열에서 현제 스택에서 중복되는 것이 있는지 본다.
        
        // 중복이 아니라면 quque에 넣는다.
        // 스택에도 넣는다. (이러면 중복일 필요가..?)
        // 만약 스택이 초과 했다면 break;
    }
    //미처 넣지 못한 데이터 전부 불러와 넣는다.
    //리턴
    return cafeList;
}

export async function setLocation(){


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



