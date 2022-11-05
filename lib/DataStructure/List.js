/** 일반 리스트 */
export class List extends Array {
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
}

