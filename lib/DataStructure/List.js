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

    sort(fuc){
      if(this.isEmpty()) return this.nodes;
      let compare = fuc;
      if(fuc == null){
        compare = (a,b)=>{
          return (a<b);
        }
      }
      return this.mergeSort(this.nodes,compare);
    }

    merge(left, right,compare) {
      const sortedArr = [];
      while (left.length && right.length) {
        if (compare(left[0],right[0])) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
      }
      return [...sortedArr, ...left, ...right];
    }
  
    
    mergeSort(arr,compare) {
      if (arr.length === 1) return arr;
      const boundary = Math.ceil(arr.length / 2);
      const left = arr.slice(0, boundary);
      const right = arr.slice(boundary);
  
      return this.merge(this.mergeSort(left,compare), this.mergeSort(right,compare),compare);
    }
}

export class ReviewList extends List{
  sort(){
    if(this.isEmpty()) return this.nodes;
    return this.mergeSort(this.nodes,this.compareDate);
  }
  compareDate(a,b){
    return (a.date>b.date);
  }
}

export class CafeList extends List{
  merge(left, right,compare) {
    const sortedArr = [];
    while (left.length && right.length) {
      if (compare(left[0],right[0])) {
          sortedArr.push(left.shift());
      } else {
          sortedArr.push(right.shift());
      }
    }
    return [...sortedArr, ...left, ...right];
  }

  
  mergeSort(arr,compare) {
    if (arr.length === 1) return arr;
    const boundary = Math.ceil(arr.length / 2);
    const left = arr.slice(0, boundary);
    const right = arr.slice(boundary);

    return this.merge(this.mergeSort(left,compare), this.mergeSort(right,compare),compare);
  }

  sortDistance(){
    return this.mergeSort(this.nodes,this.compareDistace);
  }
  sortRating(){
    return this.mergeSort(this.nodes,this.compareRating);
  }
  sortVisitor(){
    return this.mergeSort(this.nodes,this.compareVisitor);
  }
  sortNowVisitor(){
    return this.mergeSort(this.nodes,this.capareNowVisitor);
  }
  compareDistace(left,right){
    return (left.getDistance() < right.getDistance());
  }
  compareRating(left,right){
    return (left.getRating() > right.getRating());
  }
  compareVisitor(left,right){
    return (left.getVisitors() > right.getVisitors());
  }
  capareNowVisitor(left,right){
    return (left.getNowVisitor() > right.getNowVisitor());
  }

  Fillter(text){
    return this.nodes.filter((node)=>{
      return node.getName().includes(text);
    })
    
  }
}