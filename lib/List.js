class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
}

export class List {
    constructor() {
      this.nodes = [];
    }
    
    push(item) {
      this.nodes.push(item);
    }
  
    pop() {
      return this.nodes.pop();
    }
  
    length() {
      return this.nodes.length;
    }
  
    isEmpty() {
      return this.length() === 0;
    }
}

export class Queue {
    constructor() {
      this.front = null;
      this.rear = null;
    }

    isEmpty() {
      return this.front == null && this.rear === null;
    }

    push(data) {
      const newNode = new Node(data);
      if (this.isEmpty()) this.front = newNode;
      else this.rear.next = newNode;
      this.rear = newNode;
    }
  
    pop() {
      if (this.isEmpty()) return;
      this.front = this.front.next;
      if (!this.front) this.rear = null;
    }
  
    front() {
      if (this.isEmpty()) return false;
      return this.front.data;
    }
  
    display() {
      if (this.isEmpty()) return;
      let curr = this.front;
      while (curr != this.rear) {
        console.log(curr.data);
        curr = curr.next;
      }
      console.log(curr.data);
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
}