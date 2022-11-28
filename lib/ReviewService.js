import { dbService } from "../FireServer";
import { ReviewList } from "./DataStructure/List";

const CafeDatabase = dbService.collection("CafeData");

export class ReviewService{
    constructor(cafeId, userId){
        this.cafeId = cafeId;
        this.userId = userId;
        this.reviewList = new ReviewList();
    }

    /** 리뷰 불러오기 */
    async loadReview(){
        await CafeDatabase.doc(this.cafeId).collection("Review").get().then((doc)=>{
            doc.forEach((item)=>{
                
                this.reviewList.push(item.data());
            })
        }).catch((err)=>{
            console.log("리뷰 데이터를 불러오지 못했습니다.",err);
        })

        this.reviewList = this.reviewList.sort();
        return this.reviewList;
    }

    async loadReviewImage(){

    }

    /** 리뷰를 업로드 합니다 (text(str), image(url)) */
    async uploadReview(date,text, image){
        const review =  await CafeDatabase.doc(this.cafeId).collection("Review").add({
            image: (image != null) ? image : null,
            text: (text != null) ? text : " ",
            date: date,
        }).catch((err)=>{
            console.log(err);
        })
        return review.id;
    }
}