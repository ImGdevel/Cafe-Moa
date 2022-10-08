import { MyDatabase } from './fbase';


export const getData = (item) => {

} 

export const addData = (item) => {
    MyDatabase.ref('/items').push({
        name: item
    });
}

export class Database {
    constructor () {}

}
