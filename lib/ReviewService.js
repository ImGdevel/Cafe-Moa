import { dbService } from "../FireServer";


const ReviewDatabase = dbService.collection("Review");


export class ReviewService{
    constructor(cafeId){
        this.cafeId = cafeId;

    }



}
