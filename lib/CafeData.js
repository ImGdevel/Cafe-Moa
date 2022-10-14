import { dbService } from '../FireServer';

const cafeCollection =  dbService.collection("cafe");


class CafeData {
    constructor(_name, _brand , _geo_loc, _adress) {
      this.name = _name;
      this.brand = _brand
      this.geo_location = _geo_loc;
      this.adress = _adress;
    }
}


