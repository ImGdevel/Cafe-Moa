import { dbService } from "../FireServer";
import { ReviewList } from "./DataStructure/List";

const CafeDatabase = dbService.collection("CafeData");

export class ReviewService{
    constructor(cafe, user){
        this.cafeId = cafe.id;
        this.user = user;
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
    async uploadReview(text, image, rate){
        const date = new Date()
        
        const review =  await CafeDatabase.doc(this.cafeId).collection("Review").add({
            image: (image != null) ? image : null,
            text: (text != null) ? text : " ",
            date: date,
            rate: rate,
            user:{
                name: this.user.getName(),
                id: this.user.userId,
            }
        }).catch((err)=>{
            console.log(err);
        })
        this.user.addReview(this.cafeId, review.id);
    }
}