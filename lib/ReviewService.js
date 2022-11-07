import { dbService } from "../FireServer";

const ReviewDatabase = dbService.collection("Review");

export class ReviewService{
    constructor(cafeId){
        this.cafeId = cafeId;
        this.reviewList;        
    }

    async loadReview(){
        await ReviewDatabase.doc(cafeId).get().then((doc)=>{
            var review_list = doc.data();
            this.reviewList = review_list;
        }).catch((err)=>{
            console.log("리뷰 데이터를 불러오지 못했습니다.",err);
        })
    }

    getReview(){
        let list = this.reviewList;
        return list;
    }

    async uploadReview(){
        await ReviewDatabase.doc(cafeId).get().then((doc)=>{
            var review_list = doc.data();
            this.reviewList = review_list;
        }).catch((err)=>{
            console.log("리뷰 데이터를 불러오지 못했습니다.",err);
        })
    }

}