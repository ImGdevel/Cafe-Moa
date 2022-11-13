/** 카페 데이터 포멧 */
export class CafeData{
    constructor(name, location, address, seatnumber, opentime, closetime, LogoImage) {
      this.id = null;               //카페 고유 ID
      this.name = name;             //카폐이름      
      this.brand = null;            //브랜드 (현제 미사용)
      this.location = location;     //좌표
      this.adress = address;        //주소
      this.count = seatnumber;      //좌석 갯수
      this.startTime = opentime;    //오픈 시간
      this.endTime = closetime;     //폐점 시간
      this.network = new Array();   //주변 카페 네트워크
      this.Logo = LogoImage;        //카페 로고 이미지
      this.seatImge = null;         //좌석 이미지
      this.StoreImage;              //가게 이미지
      this.seatId;                  //좌석 데이터

      this.distance;      //현 위치와의 거리
      //리뷰
      this.rating = 0;        //평점
      this.review = new Array();        //리뷰
      this.reviewCount = 0;   //리뷰갯수
      this.visitors = 0;      //방문자수
      
    }

    loadData(data){
      this.name = data.name;
      this.brand = data.name;
      this.location = data.location;
      this.adress = data.adress;
      this.count = data.count;
      this.startTime = data.time.open;
      this.endTime = data.time.close;
      this.seatId = data.seatId;

      this.rating = (data.rating != undefined) ? data.rating : null;  
      this.review = (data.review != undefined) ? data.review : null;       
      this.reviewCount = 0;
      this.visitors = (data.visitors != undefined) ? data.visitors : null;;   
    }

    addRatingPoint(num){
      this.rating = float((this.rating*this.reviewCount + num) / (this.reviewCount + 1)).toFixed(1);
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
    
    /** 주소 : 시작 번호와 끝 번호를 주어 출력하고 싶은 만큼 출력 (0. 도 | 1.시/군 | 2.동/면/구 | 3~4.상제주소 )
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

    getAddressAll(){
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
      return this.seatId;
    }
    
    getLogo(){
      return this.Logo;
    }

    getId(){
      return this.id;
    }

    setRating(rating){
      let rat = parseFloat(rating);
      this.rating = rat.toFixed(1);
    }
    
    getRating(){
      let rat = parseFloat(this.rating);
      return rat.toFixed(1);
    }

    getReview(){
      return this.review;
    }

    getReviewCount(){
      return this.reviewCount;
    }

    addReview(review){
      this.review.push(review)
      this.reviewCount += 1;
    }

    setReview(review){
      this.review = review;
      this.reviewCount = (this.review!=null) ? this.review.length : 0;
    }

    setvisitors(visitors){
      this.visitors = visitors;
    }

    getVisitors(){
      return this.visitors;
    }

    setDistance(dis){
        this.distance = dis;
    }

    getDistance(){
      return this.distance; 
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

    setSeatId(_seat){
      this.seatId = _seat;
    }

    setNetwork(_net){
      this.network = _net;
    }

    addNetwork(_node){
      this.network.push(_node);
    }
}