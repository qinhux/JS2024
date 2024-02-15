// 因为nodeType要作为map的key，要求nodeType为基本类型，不能为引用类型
type nodeType = number|string; 

//把无向图和有向图，都写在了graph类中
class graph { //类可不可以不要constructor
    adjacencyList: Map<nodeType, Set<nodeType>>;

    constructor() {
        this.adjacencyList = new Map();
    }

    hasNode(node: nodeType): boolean {
        return this.adjacencyList.has(node);
    }

    hasUndirectedEdge(node1: nodeType, node2: nodeType): boolean {
        if (node1 === node2) {
            throw new Error("hasUndirectedEdge函数,输入的两个节点值不能相同");
        }

        let set1 = this.adjacencyList.get(node1);
        let set2 = this.adjacencyList.get(node2);

        if (set1 === undefined || set2 === undefined) {
            return false;
        }

        if (set1.has(node2) && set2.has(node1)) {
            return true;
        }

        if (set1.has(node2) && !set2.has(node1)) {
            throw new Error("hasUndirectedEdge函数: 邻接表的表示有问题。node1连接到node2, 但node2没有连接到node1");
        }

        if (set2.has(node1) && !set1.has(node2)) {
            throw new Error("hasUndirectedEdge函数: 邻接表的表示有问题。node2连接到node1, 但node1没有连接到node2")
        }

        else { // if (!set1.has(node2) && !set2.has(node1))
            return false;
        }
    }

    hasdirectedEdge(node1: nodeType, node2: nodeType): boolean {
        if (node1 === node2) {
            throw new Error("hasdirectedEdge函数,输入的两个节点值不能相同");
        }

        let set1 = this.adjacencyList.get(node1);

        if (set1 === undefined) {
            return false;
        }

        if (set1.has(node2)) {
            return true;
        }

        else { // if (!set1.has(node2))
            return false;
        }
    }

    addNode(node: nodeType): void {
        if (this.adjacencyList.has(node)) {
            throw new Error("addNode函数: 要加入的结点在图中已经存在");
        }

        let set: Set<nodeType> = new Set();

        this.adjacencyList.set(node, set);
    }

    //还没有写图中已经存在想插入的边的情况
    // 还没有写存在一个set中有另一个node，这种情况应该报错
    addUndirectedEdge(node1: nodeType, node2: nodeType): void {
        if (node1 === node2) {
            throw new Error("addUndirectedEdge函数: 添加的node1和node2的值,不能相同");
        }

        let set1 = this.adjacencyList.get(node1);
        let set2 = this.adjacencyList.get(node2);

        if (set1 === undefined) {
            set1 = new Set();
            set1.add(node2);

            this.adjacencyList.set(node1, set1);    
        }
        else {  // set1 !== undefined
            set1.add(node2);
        }

        if (set2 === undefined) {
            set2 = new Set();
            set2.add(node1);

            this.adjacencyList.set(node2, set2);
            
        }
        else { // set2 !== undefined
            set2.add(node1);
        }
    }

    //还没有写图中已经存在想插入的边的情况
    addDirectedEdge(node1: nodeType, node2: nodeType): void {
        if (node1 === node2) {
            throw new Error("addDirectedEdge函数: 添加的node1和node2的值,不能相同");
        }

        let set1 = this.adjacencyList.get(node1);

        if (set1 === undefined) {
            set1 = new Set();
            set1.add(node2);

            this.adjacencyList.set(node1, set1);    
        }
        //还没有写如果已经存在边的情况
        else {  // set1 !== undefined
            set1.add(node2);
        }
    }

    getNeighbors(node: nodeType): nodeType[] { //返回数组
        let set = this.adjacencyList.get(node);

        if (set === undefined) {
            throw new Error(`getNeighbors: 图中不存在值为${node}的结点`)
        }

        return Array.from(set);
    }
}








// type adjacencyList = node[];

// interface node {
//     val: nodeType;
//     next: node | null;
// }



// function hasNode(graph: adjacencyList, nodeVal: nodeType) {
//     for (let i = 0; i < graph.length; i++) {
//         let node = graph[i];
//         if (node.val === nodeVal) {
//             return true;
//         }
//     }

//     return false;
// }

// function addNode(graph: adjacencyList|null, nodeVal: nodeType): adjacencyList {
//     let node: node = {val: nodeVal, next: null};
    
//     if (graph === null) {
//         return [node];
//     }

//     if (hasNode(graph, nodeVal)) { // 怎样写graph.has()这种方法。
//         return graph;
//     }

//     graph.push(node);

//     return graph;
// }

// function createNewNode(nodeVal: nodeType, next?: node) { //可以这样使用？吗
//     let node: node = {val: nodeVal, next: null};

//     return node;
// }

// function addEdge(graph:adjacencyList|null, nodeVal1: nodeType, nodeVal2: nodeType):adjacencyList {
//     if (nodeVal1 === nodeVal2) {
//         throw new Error("addEdge函数中,输入的两个结点值不能相同");
//     }

//     if (graph === null) {
//         graph = [];

//         let node1: node = createNewNode(nodeVal1);
//         let node2: node = createNewNode(nodeVal2);

//         node1.next = node2;
//         node2.next = node1;

//         graph.push(node1, node2);

//         return graph;
//     }

//     if (!hasNode(graph, nodeVal1) && !hasNode(graph, nodeVal2)) {
//         let node1: node = createNewNode(nodeVal1);
//         let node2: node = createNewNode(nodeVal2);

//         node1.next = node2;
//         node2.next = node1;

//         graph.push(node1, node2);

//         return graph;
//     }

//     else if (!hasNode(graph, nodeVal1)) {
//         let node1: node = createNewNode(nodeVal1);
//         let node2: node = findNode(graph, nodeVal2);

//         node1.next = node2;
        
//     }

    
// }

