
import { dbService } from '../FireServer';
import { TimeTable } from './ReversationDataStructure';

const cafeCollection =  dbService.collection("cafe");

export class CafeData {
    constructor(_name, _brand , _geo_loc, _adress, _number_of_seat) {
      this.name = _name;
      this.brand = _brand
      this.location = _geo_loc;
      this.adress = _adress;
      this.count = _number_of_seat;
      this.network = new Array();
      this.seat = new TimeTable();
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

cafe = new CafeData();

cafe.seat.insertTime(1);
cafe.seat.insertTime(2);