import { NavigationContext } from '@react-navigation/native';
import { dbService } from '../FireServer';
import { CafeData } from './CafeData';
import { List, Queue } from './List';

export async function getCafeDatabase(){
    const finded_cafe = new List();
    // 현제 위치를 기반으로 가까운 카페를 찾고
    //startCafe 
    // 찾은 카페의 주소값(?) 아니 카페 정보 자체를 여기로 가져 왔!
    // 찾은 카페 주소를 start로 넣어주면!
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
    cafeList.pushNode(start_point);
    while(!cafe_queue.empty()){
        var current_id = cafe_queue.front();
        var current_node = await dbService.collection("CafeData").doc(current_id).get();
        console.log(current_node);
        
        // pop(); 맨 처음에 넣은거 넣은거 빼고 
        //현제 노드의 데이터 배열을 받는다. 현제 quque에 팝
        
        // 데이터 배열에서 현제 스택에서 중복되는 것이 있는지 본다.
        
        // 중복이 아니라면 quque에 넣는다.
        // 스택에도 넣는다. (이러면 중복일 필요가..?)
        //만약 스택이 초과 했다면 break;
    }
    //미처 넣지 못한 데이터 전부 불러와 넣는다.
    //리턴
    return cafeList;
}

/*____카페 추가 알고리즘________________________________________________________*/

export async function addCafeDatabase(_cafe_datas){
    // 이걸로 끝? 아니 지역에 따라 데이터를 가져오자!
    // 지역...에 데이터 배열
    
    _cafe_datas.network = await getCafeNetwork(_cafe_datas);
    console.log(_cafe_datas.network);
    
    var id = await dbService.collection("CafeData").add({
        name: _cafe_datas.name,
        location:_cafe_datas.location,
        adress: _cafe_datas.adress,
        count: _cafe_datas.count,
        network: _cafe_datas.network,
    })
    _cafe_datas.network.forEach(element => {
        updateCafeNetwork(element, id.id); 
    });
}

//주변지역 탐색후 주변 카페 정보 인풋
async function getCafeNetwork(_cafe_datas){
    var network = new Array();
    await dbService.collection("CafeData").get().then((docs) => {
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
    await dbService.collection("CafeData").doc(_setid).get().then((doc)=>{
        if(doc.exists){
            tempNet = doc.data().network;
            tempNet.push(_id)
        }
    });
    await dbService.collection("CafeData").doc(_setid).update({
        network: tempNet,
    })
}

/*_______________________________________________________________*/

export async function setLocation(){

}

export async function updateCafeDatabase(id,_cafe_data){

    await dbService.collection("CafeData").doc(id).update({
        
    })
}



function getDistance(a_latitude, a_longitude, b_latitude, b_longitude){
    return (Math.abs(a_latitude-b_longitude)+Math.abs(b_latitude-b_longitude))
}
