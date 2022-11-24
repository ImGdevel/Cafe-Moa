import { dbService } from "../FireServer";
import { List } from "./DataStructure/List";
import { getImage } from "./ImageService";

const SeatDatabase = dbService.collection("Advertisement");

export class AdvertisementService{
    constructor(){
        this.AdList = new List();
        this.load();
    }

    async load(){
        SeatDatabase.get().then((data)=>{
            let datas = data.data();
            datas.map(async(item)=>{
                console.log(fomat)
                const fomat = {
                    image: await getImage(item.image),
                    url: item.url,
                }
                this.AdList.push(fomat);
            })
        })
    }

    async getList(){
        if(this.AdList.isEmpty()){
            await this.load()   
        }
        return this.AdList.getArray();
    }
}