export class List{
    constructor(){
        this.datas = new Array();
    }
    push(_node){
        this.datas.push(_node);
    }
    pop(_node){
        this.datas.pop();
    }
    empty(){
        return (this.datas == null_)
    }
    find(_node){
        if(this.datas.find(ds => ds == _node)){
            return true;
        }
        return false;
    }
    length(){
        return this.datas.length;
    }
    getListAll() {
        return this.datas;
    }
}

export class Queue extends List{
    constructor(){
        this.datas = new Array();
    }

    front(){
        return this.datas.shift();
    }
}

export class Stack extends List{
    
}