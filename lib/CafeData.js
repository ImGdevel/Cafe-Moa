
import { dbService } from '../FireServer';
import { TimeTable } from './DataStructure/ReversationDataStructure';

const cafeCollection =  dbService.collection("cafe");

export class CafeData {
    constructor(_name, _brand , _geo_loc, _adress, _number_of_seat) {
      this.name = _name;
      this.brand = _brand
      this.location = _geo_loc;
      this.adress = _adress;
      this.count = _number_of_seat;
      this.network = new Array();
      this.seat = new TimeTable(); //원래 이거인데 아마도 삭제 예정
      //아래 예시, 삭제 금지
      //this.seat10 = new TimeTable().insertOneTimeArray(10); //이거 된 거 this.seat.inser~는 안 됨, insert 여기서 실행 안 됨
      //this.seat11 = this.seat.insertOneTimeArray(11);
    }
    
    setNetwork(_net){
      this.network = _net;
    }

    setSeat(_seat){
      this.seat = _seat;
    }

    addNetwork(_node){
      this.network.push(_node);
    }
}