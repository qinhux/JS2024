//学习网上的dijkstra算法

let graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
}

function dijkstra2(graph, start, end?) {
    let result: Map<string, number> = new Map(); //存储已获得最短距离的结点

    
    let distanceMap = initialDistance(graph, distanceMap);

    // let currentNode = 

    let visited: Set<string> = new Set();    

}