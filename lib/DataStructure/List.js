//import { mergeSort } from "./Sort";

/** 일반 리스트 */
class List{
    constructor() {
      this.nodes = [];
    }
    
    push(item) {
      this.nodes.push(item);
    }
  
    pop() {
      return this.nodes.pop();
    }

    find(){
      return this.nodes.find();      
    }
  
    length() {
      return this.nodes.length;
    }
  
    isEmpty() {
      return this.length() === 0;
    }
    
    getArray(){
      return this.nodes;
    }

    sort(){
      return mergeSort(this.nodes);
    }

    mergeSort(arr) {
      if (arr.length === 1) return arr;
      const boundary = Math.ceil(arr.length / 2);
      const left = arr.slice(0, boundary);
      const right = arr.slice(boundary);
      return merge(mergeSort(left), mergeSort(right));
    }
    
    merge(left, right) {
        const sortedArr = [];
        while (left.length && right.length) {
          if (left[0] <= right[0]) {
              sortedArr.push(left.shift());
          } else {
              sortedArr.push(right.shift());
          }
        }
        return [...sortedArr, ...left, ...right];
    }
}


export class CafeList extends List{
  merge(left, right) {
    const sortedArr = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
          sortedArr.push(left.shift());
      } else {
          sortedArr.push(right.shift());
      }
    }
    return [...sortedArr, ...left, ...right];
  }

  sortDistance(){
    return mergeSort(this.nodes);
  }

  sortRating(){
    return mergeSort(this.nodes);
  }

}