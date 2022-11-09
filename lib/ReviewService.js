import { dbService, MyDatabase } from "../FireServer";

const ReviewDatabase = dbService.collection("Review");

const ReviewFormat = {
    image : null,
    text : null,
}

export class ReviewService{
    constructor(cafeId){
        this.cafeId = cafeId;
        this.reviewList = new ReviewList();
    }

    async loadReview(){
        await ReviewDatabase.doc(cafeId).get().then((doc)=>{
            this.reviewList = doc.data().reviewList; 
        }).catch((err)=>{
            console.log("리뷰 데이터를 불러오지 못했습니다.",err);
        })
    }

    /** 리뷰를 업로드 합니다 (text(str), image(url)) */
    async uploadReview(text, image){
        let format = ReviewFormat;
        format.image = (image != null) ? image : null;
        format.text = (text != null) ? text : " ";
        await ReviewDatabase.doc(cafeId).update({
            reviewList : MyDatabase.firestore.FieldValue.arrayUnion(format),
        })
    }
}

class ReviewList{
    constructor(){
        this.node = new Array();
    }
}