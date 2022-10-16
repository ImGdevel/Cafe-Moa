import { dbService } from '../FireServer';

const cafeCollection =  dbService.collection("cafe");

export class CafeData {
    constructor(_name, _brand , _geo_loc, _adress, _number_of_seat, cafe_node) {
      this.name = _name;
      this.brand = _brand
      this.location = _geo_loc;
      this.adress = _adress;
      this.count = _number_of_seat;
      this.network = cafe_node;
    }
}