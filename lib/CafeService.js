import { dbService, FileUpdate, MyDatabase } from '../FireServer';
import { CafeData } from './CafeData';
import { CafeList, List } from './DataStructure/List';
import { PriorityQueue, Queue } from './DataStructure/Queue';
import { getImage, pickImage, uploadImage } from './ImageService';
import { getAddressFromLocation } from './LocationService';
import { createNewSeatData } from './ReservationService';

const CafeDatabase = dbService.collection("CafeData");
const LocationDatabase = dbService.collection("Location");

export class CafeService{
    constructor(location,address){
        this.cafeDataList = new CafeList();
        this.location = location;
        this.address = address;
    }

    getCafeDataListArray(){
        return this.cafeDataList.getArray();
    }

    async setLocation(){
        this.location = (this.location == null) ? await getGeoLocation() : this.location;
        this.address = (this.address == null) ? await getAddressFromLocation(this.location) : this.address;
    }

    async getCafeDatabase(){
        this.location = {latitude: 37.25894 ,longitude: 127.19069}
        this.address =  {city1: "경기도" , city2: "용인시", city3:"처인구"}
        
        let queue = (await serchNearestCafe(this.location,this.address)).allList();
        let dataList = await bfsSerch(queue,2);
        console.log(dataList);
        return dataList;
    }
    
    async bfsSerch(list,max){
        let cafeDataList = new List(); //최종적으로 반환할 카페 데이터 List
        let queue = new Queue(); //너비탐색 Queue 
        let finded = new List();
        
        queue.push(true);
        list.forEach((item)=>{
            queue.push(item);
        })
        console.log(queue)
        //queue.push();
        //while(!queue.isEmpty()){
        
        while(queue.isEmpty()){
            let current_node = queue.front();
            let current_network = new Array();
            current_network = current_node.network //주변 카페 ID 리스트
            
            // 현제 노드찾기
            // 만약 노드가 없다면? // 다른 지역 id 에서 추가 // 만약 지역이 다르다면? //다른 지역에서 데이터 추출
        }
        const promises = finded.map(async (id) => {
        const item = await this.getCafeData(id) 
            this.cafeDataList.push(item);
        });
        await Promise.all(promises);
    
        return this.cafeDataList.getArray();
    }

    /** 현 포인트에서 가장 가까운 카페 탐색 우선순위 큐로 탐색*/
    async serchNearestCafe(_loc,_city){
        let location = (_loc == null) ? this.location : _loc;
        let city = (_city == null) ? this.address : _city;
        let search_range = 0.08;
        let p_queue = new PriorityQueue();

        if(location == null){
            console.log("도시정보 없음");
            location = await getAddressFromLocation(location);
        }
        await LocationDatabase.doc(city.city1).collection(city.city2).get().then((docs)=>{
            docs.forEach((doc)=>{
                if(doc.exists){
                    var data = doc.data();
                    var distance = this.getDistance(data.location,location);
                    if(distance < search_range){
                        p_queue.push(data.id)
                    }
                }
            })
        }).catch((err)=>{
            console.log("주변 카페 데이터를 불러 오는데 실패했습니다 : ", err);
        });
        return p_queue;
    }       
    
    sortCafeData(type){
        const [DISTANCE, RATING] = [1,2];
        let sortedList;

        switch (type) {
            case DISTANCE:
                sortedList = this.cafeDataList.sortRating();
                break;
            case RATING:
                sortedList = this.cafeDataList.sortRating();
                break;
            default:
                break;
        }
        return sortedList;
    }

    async getCafeData(cafe_id){
        let cafe_data = new CafeData();
        await CafeDatabase.doc(cafe_id).get().then(async(data)=>{
            const cafe = new CafeData();
            cafe.loadData(data.data())
            cafe.id = cafe_id;
            if(cafe_id != null){
                cafe.setLogoImage(await getImage("Cafe",cafe_id,"logo"));
                cafe.setSeatImage(await getImage("Cafe",cafe_id, "seatImage"));
            }
            cafe_data = cafe
        });
        return cafe_data;
    }

    /** 지역 정보로 간단히 가져오기 */
    async getCafeDatabaseAd(){
        //let location = (_loc == null) ? await getGeoLocation() : _loc; /////////////////////////////////////////////////////////////
        let location = {latitude: 37.25894 ,longitude: 127.19069}
        let current_adress =  {city1: "경기도" , city2: "용인시", city3:"처인구"} //(_city == null) ? await getAddressFromLocation(location) : _city; ///////////////////////////////////////////////////////////
        let datas = await LocationDatabase.doc(current_adress.city1).collection(current_adress.city2).get();
        let idDoc = [];
        datas.forEach(item => {
            idDoc.push(item.id)
        });
        const promises = idDoc.map(async (id) => {
            this.cafeDataList.push(await this.getCafeData(id));
        });
        await Promise.all(promises);
        return this.cafeDataList.getArray();
    }

    /** 데이터베이스에 데이터 추가 _________________________________________________*/
    async addCafeDatabase(_data){
        if(_data === null || _data.name === null || _data.location === null){
            console.log("정보가 부족합니다!");
            return;
        }
        let cafe_datas = new CafeData();
        cafe_datas = _data;
        
        cafe_datas.adress = (cafe_datas.adress == null) ? await getAddressFromLocation(_data.location) : cafe_datas.getAddressAll();
        let data = ((await this.serchNearestCafe(cafe_datas.getLocation(),cafe_datas.getAddressAll())).heap);
        data.shift();
        cafe_datas.network = data;
        cafe_datas.setSeatId(await createNewSeatData(cafe_datas.getOpenTime(), cafe_datas.getCloseTime()));
        console.log(cafe_datas.getName());

        var id = await CafeDatabase.add({
            name: cafe_datas.getName(),
            location: cafe_datas.getLocation(),
            adress: cafe_datas.getAddressAll(),
            count: cafe_datas.getSeatCount(),
            seatId: cafe_datas.getSeatId(),
            time: {
                open: cafe_datas.getOpenTime(),
                close: cafe_datas.getCloseTime(),
            },
            rating: cafe_datas.getRating(),
            review: [],
            visitor: 0,
            cumulative: cafe_datas.getVisitors(),
        }).catch((err)=>{
            console.log("서버에 데이터를 저장하지 못했습니다 :", err)
        })

        if(cafe_datas.getLogo() == null){
            var image = await pickImage();
            await uploadImage(image,"Cafe",id.id,"logo");
        }
        if(cafe_datas.getSeatImage() == null){
            var image = await pickImage();
            await uploadImage(image,"Cafe",id.id,"seatImage");
        }
        //인접 데이터 세팅
        this.insertDataInLocation(cafe_datas.adress,cafe_datas.location,id.id,cafe_datas.network);
        if(data != false){
            cafe_datas.network.forEach(element => {
                this.updateCafeNetwork(element, id.id);
            });
        }
        console.log("카페 업로드");
    }

    /** 지역정보에 카페 아이디 등록 */
    async insertDataInLocation(_city, _loc, _id,_net){
        const {city1:c1,city2:c2} = _city;
        const {latitude,longitude} = _loc;
        await LocationDatabase.doc(c1).collection(c2).doc(_id).set({
            id: _id,
            location:{
                latitude: latitude,
                longitude: longitude,
            },
            network: _net,
        }).catch((err)=>{
            console.log("지역정보를 갱신하는데 문제가 발생했습니다.",err);
        })
    }

    /** 인접 카페 정보 (그래프 노드) 업데이트 */
    async updateCafeNetwork(_setid, _id){
        var city;
        await CafeDatabase.doc(_setid).get().then((doc)=>{
            if(doc.exists){
                city = doc.data().adress
            }
        })
        await LocationDatabase.doc(city.city1).collection(city.city2).doc(_setid).update({
            network : MyDatabase.firestore.FieldValue.arrayUnion(_id),
        })
    }

    setDistance(){
        

        
    }

    /** 거리계산 */
    getDistance(point_from, point_to){
        return (Math.abs(point_from.latitude-point_to.latitude)+Math.abs(point_from.longitude-point_to.longitude))
    }
}

/** 단일 카페데이터 */
export async function getCafeData(cafe_id){
    let cafe_data = new CafeData();
    await CafeDatabase.doc(cafe_id).get().then(async(data)=>{
        const cafe = new CafeData();
        cafe.loadData(data.data())
        cafe.id = cafe_id;
        if(cafe_id != null){
            cafe.setLogoImage(await getImage("Cafe",cafe_id,"logo"));
            cafe.setSeatImage(await getImage("Cafe",cafe_id, "seatImage"));
        }
        cafe_data = cafe
    });
    return cafe_data;
}
