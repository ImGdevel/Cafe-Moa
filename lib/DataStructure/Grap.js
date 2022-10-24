export class Graph {
    constructor(){
        this.nodes = {};
    }
    
    addNode(node){
        this.nodes[node] = this.nodes[node] || [];
    }

    isEmpty(node){
        let result = null;
        this.nodes[node] ? (result = true) : (result = false);
        return result;
    }

    removeNode(node){
        this.nodes[node] ? delete this.nodes[node] : this.nodes[node];
    }

    hasEdge(fromNode, toNode){
        this.nodes[fromNode] &&
        this.nodes[toNode] &&
        this.nodes[fromNode].include(toNode) &&
        this.node[toNode].include(fromNode)
        ?(result = ture)
        :(result = false);
        return result;
    }
    
    addEdge(fromNode, toNode){
        this.nodes[fromNode].push(toNode);
        this.nodes[toNode].push(fromNode);
    }

    removeNode(fromNode,toNode){
        let node = this.nodes[fromNode];
        if(
            this.nodes[fromNode].include(toNode) &&
            this.nodes[toNode].include(fromNode)
        ) {
            this.nodes[fromNode][node.indexOf(toNode)] = "";
            this.nodes[toNode][node.indexOf(fromNode)] = "";
        }
    }
}

