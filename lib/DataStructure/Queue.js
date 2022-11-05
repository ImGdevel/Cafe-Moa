class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
}

export class Queue {
    constructor() {
      this.first = null;
      this.last = null;
      this.size = 0;
    }

    isEmpty() {
      return this.first == null && this.last === null;
    }

    push(data) {
      const newNode = new Node(data);
      this.size += 1;
      if (this.isEmpty()) {
        this.first = newNode;
      } else {
        this.last.next = newNode;
      };
      this.last = newNode;
    }
  
    pop() {
      if (this.isEmpty()) return;
      this.first = this.first.next;
      this.size -= 1;
      if (!this.first) this.last = null;
    }
  
    front() {
      if (this.isEmpty()) return false;
      const data = this.first.data;
      return data;
    }

    length(){
      const len = this.size;
      return len;
    }
}

/** 우선순위 큐 */
export class PriorityQueue {
  constructor() {
      this.heap = [0];
  }

  push(value) {
      this.heap.push(value);
      this.heapifyUp();
  }

  pop() {
      if (this.isEmpty()) return false;

      const temp = this.heap.pop();
      const returnValue = this.heap[1];
      if (this.size() === 0) {
          return temp;
      }
      this.heap[1] = temp;
      this.heapifyDown();
      return returnValue;
  }

  find(data){
    const found = heap.find(data);
    console.log(found);
  }

  size() {
      return this.heap.length - 1;
  }

  isEmpty(){
     return (this.size() === 0)
  }

  change(child, parent, heap) {
    const temp = heap[parent];
    heap[parent] = heap[child];
    heap[child] = temp;
    parent = child;
    const left = parent * 2;
    const right = parent * 2 + 1;
    return [parent, left, right];
  }

  heapifyUp() {
      const heap = this.heap;
      let child = heap.length - 1;
      let parent = Math.floor(child / 2); 
      while (parent !== 0) {
          if (heap[parent][1] <= heap[child][1]) {
              break;
          } else {
              const temp = heap[parent];
              heap[parent] = heap[child];
              heap[child] = temp;
              child = parent;
              parent = Math.floor(child / 2);
          }
      }
  }

  heapifyDown() {
      const heap = this.heap;
      let parent = 1;
      let left = parent * 2;
      let right = parent * 2 + 1;

      while (heap[left] !== undefined || heap[right] !== undefined) {
          if (heap[right] === undefined) {
              if (heap[left][1] > heap[parent][1]) break;
              this.change(left, parent, heap);
              break;
          }

          if (heap[left][1] <= heap[right][1]) {
              if (heap[left][1] > heap[parent][1]) break;
              [parent, left, right] = this.change(left, parent, heap);
          } else {
              if (heap[right][1] > heap[parent]) break;
              [parent, left, right] = this.change(right, parent, heap);
          }
      }
  }

  allList(){
    this.heap.shift()
    return this.heap;
  }
}