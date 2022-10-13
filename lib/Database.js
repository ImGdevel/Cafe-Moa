import { MyDatabase } from './fbase';
import {CafeData} from './DataStructure';

export const getData = (item) => {

}


export const inputDatabaseCafeData = async(cafe) => {
    console.log()
    MyDatabase.ref('/items').push({
        name: item
    });
};

export const getDataSample = async() => {
    MyDatabase.collection("").onSnapshot(snapshot =>{
        console.log("something happen");
    })
}


export const addData = async (item) => {
    MyDatabase.ref('/items').push({
        name: item
    });
}

export const cafeData = () => {

}