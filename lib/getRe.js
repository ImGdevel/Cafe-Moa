import { dbService } from "../FireServer";

export async function getReservation(){
    var time = [];
    dbService.collection('CafeData').get().then((reservation)=>{
        reservation.forEach((doc)=>{
            console.log(doc.data());
        })
    })
}