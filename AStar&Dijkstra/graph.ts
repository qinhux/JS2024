
// class graph { //类可不可以不要constructor
//     adjacencyList: node[];

//     constructor() {
//         this.adjacencyList = [];
//     }

//     hasNode(node: node): boolean {
//         for (let i = 0; i < this.adjacencyList.length; i++) {
//             let neighbor = this.adjacencyList[i];
//             if (neighbor.val === node) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     hasEdge(node1: node, node2: node) {
//         if (node1 === node2) {
//             throw new Error("hasEdge函数,输入的两个节点值不能相同");
//         }

//         for (let i = 0; i < this.array.length; i++) {
//             let neighbor = this.array[i];

//             if (neighbor.val === node1) {

//             }
//             else if (neighbor.val === node2) {

//             }
//         }
//     }
// }


type adjacencyList = node[];

interface node {
    val: nodeType;
    next: node | null;
}

type nodeType = number|string;

function hasNode(graph: adjacencyList, nodeVal: nodeType) {
    for (let i = 0; i < graph.length; i++) {
        let node = graph[i];
        if (node.val === nodeVal) {
            return true;
        }
    }

    return false;
}

function addNode(graph: adjacencyList|null, nodeVal: nodeType): adjacencyList {
    let node: node = {val: nodeVal, next: null};
    
    if (graph === null) {
        return [node];
    }

    if (hasNode(graph, nodeVal)) { // 怎样写graph.has()这种方法。
        return graph;
    }

    graph.push(node);

    return graph;
}

function createNewNode(nodeVal: nodeType, next?: node) { //可以这样使用？吗
    let node: node = {val: nodeVal, next: null};

    return node;
}

function addEdge(graph:adjacencyList|null, nodeVal1: nodeType, nodeVal2: nodeType):adjacencyList {
    if (nodeVal1 === nodeVal2) {
        throw new Error("addEdge函数中,输入的两个结点值不能相同");
    }

    if (graph === null) {
        graph = [];

        let node1: node = createNewNode(nodeVal1);
        let node2: node = createNewNode(nodeVal2);

        node1.next = node2;
        node2.next = node1;

        graph.push(node1, node2);

        return graph;
    }

    if (!hasNode(graph, nodeVal1) && !hasNode(graph, nodeVal2)) {
        let node1: node = createNewNode(nodeVal1);
        let node2: node = createNewNode(nodeVal2);

        node1.next = node2;
        node2.next = node1;

        graph.push(node1, node2);

        return graph;
    }

    else if (!hasNode(graph, nodeVal1)) {
        let node1: node = createNewNode(nodeVal1);
        let node2: node = findNode(graph, nodeVal2);

        node1.next = node2;
        
    }

    
}

