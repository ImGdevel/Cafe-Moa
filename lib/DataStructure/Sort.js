function merge(left, right, callback) {
    const sortedArr = [];
    while (left.length && right.length) {
      //left[0]이 더작을 경우 같을때는 누가 먼저 들어가도 상관X
        
      if(callback === undefined){
        if (left[0] <= right[0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
      }else{
        if (callback(left,right)) { //callback이 true라면 오른쪽이 큼
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
      }
    }
    //left,right 둘 중 하나는 요소가 남아있기 때문에 sortedArr 뒤에 붙여서 출력
    //비어있으면 spread Syntax에도 아무것도 없기 때문에 그냥 다 붙여준다.
    return [...sortedArr, ...left, ...right];
}
  
function mergeSort(arr, callback) {
    if (arr.length === 1) return arr;
    const boundary = Math.ceil(arr.length / 2);
    const left = arr.slice(0, boundary);
    const right = arr.slice(boundary);
    return merge(mergeSort(left, callback), mergeSort(right, callback));
}

const arr = [{1:1,2:2}, {2:3,4:1}, {3:1,2:32}, {2:2,6:1}, {3:4,1:2}, {3:1,7:1}, {10:1,2:0}];
const sortedArray = mergeSort(arr);
console.log(arr); //[7, 4, 3, 2, 1, 6, 5]
console.log(sortedArray); //[1, 2, 3, 4,5, 6, 7]