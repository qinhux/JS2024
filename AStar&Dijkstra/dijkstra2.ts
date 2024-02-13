//学习网上的dijkstra算法
// https://patrickkarsh.medium.com/dijkstras-shortest-path-algorithm-in-javascript-1621556a3a15
// 感觉该算法的效率很低


let graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
}


function dijkstra2(graph, start: string, end?: string) {
    let distances = {};

    let visited = new Set();

    let nodes = Object.keys(graph);

    for (let node of nodes) {
        distances[node] = Infinity;
    }

    distances[start] = 0;

    while (nodes.length) {
        nodes.sort((a,b) => distances[a]-distances[b]);
        let closestNode = nodes.shift();

        if (distances[closestNode] === Infinity) {
            break;
        }

        visited.add(closestNode);

        for (let neighbor in graph[closestNode]) {
            if (!visited.has(neighbor)) {
                let newDistance = distances[closestNode] + graph[closestNode][neighbor];
            }

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
            }
        }
    }

    return distances;
}