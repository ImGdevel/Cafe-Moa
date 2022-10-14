import { dbService } from '../FireServer';

export const userCollection = dbService.collection("users");
export const cafeCollection = dbService.collection("cafes");

export async function createCafe({name, location}){
    await cafeCollection.add({name, location});
}

export async function getCafe(id){
    const doc = await cafeCollection.doc(id).get();
    return doc.data();
}

export function createCafe2({name, location}){
    return cafeCollection.doc('cacadada').collection('user').add({name});
}