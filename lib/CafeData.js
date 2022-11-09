/** 카페 데이터 포멧 */
export class CafeData{
    constructor(_name, _brand , _geo_loc, _address, _number_of_seat, _start_time, _end_time) {
      this.id = null;
      this.name = _name;
      this.brand = _brand
      this.location = _geo_loc;
      this.adress = _address;
      this.count = _number_of_seat;
      this.startTime = _start_time;
      this.endTime = _end_time;
      this.network = new Array();
      this.Logo = null;
      this.seatImge = null;

      this.review;
      this.StoreImage;
    }

    loadData(data){
      this.name = data.name;
      this.brand = data.name;
      this.location = data.location;
      this.adress = data.adress;
      this.count = data.count;
      this.startTime = data.time.open;
      this.endTime = data.time.close;
      this.seat = data.seatId;
    }

    /*반드시 get~함수를 사용하여 데이커를 가져와라 아니면 클난다 _________________________________________ */
    /** 이름 */
    getName(){
      return this.name;
    }
    /** 브랜드 (브랜드 가페의 경우 이름이랑 같다 나중을 위한거니 지금은 굳이 필요없다.) */
    getBrand(){
      if(this.name != this.brand)
        return this.brand;
      return null;
    }
    
    /** 주소 : 시작 번호와 끝 번호를 주어 출력하고 싶은 만큼 출력 (0. 도 | 1.시/군 | 2.동/면/구 | 3~4.상제주소  ) 
    * defalt는 start = 1 end = 2*/
    getAdress(first=1,last=2){
      let adress = "";
      switch(first){
        case 0:
          adress += this.adress.city1 + " "; if(last==0) break;
        case 1:
          adress += this.adress.city2 + " "; if(last==1) break;
        case 2:
          adress += this.adress.city3 + " "; if(last==2) break;
        case 3:
          adress += this.adress.city4; if(last==3) break;
        case 4:
          adress += this.adress.city5; if(last==4) break;
        default: break;
      }
      return adress
    }

    getAdressArray(){
      return this.adress;
    }

    getOpenTime(){
      return this.startTime;
    }

    /** 마감시간 */
    getCloseTime(){
      return this.endTime;
    }

    /** 카페 좌석 */
    getSeatCount(){
      return this.count;
    }

    getNetwork(){
      return this.network;
    }

    getLocation(){
      return this.location;
    }

    getSeatId(){
      return this.seat;
    }
    
    getLogo(){
      return this.Logo;
    }

    getId(){
      return this.id;
    }

    getSeatImage(){
      return this.seatImge;
    }

    setLogoImage(_data){
      this.Logo = _data;
    }

    setSeatImage(_data){
      this.seatImge = _data;
    }

    /** */
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