//该算法未能完成

//给定一个图、起点、终点
//A*算法和Dijkstra算法输出的路径相同

// 问题: coordNode的distance属性，一开始设置为null比较好，还是设置为-1比较好，还是设置integer的最大值比较好？
// dijkstra需要写很多函数,这种情况，应该对每个函数都进行测试吗?

// 先写dijkstra算法
// type coordinates2 = [number, number];
type coordinates2 = {x: number, y: number};
type coordNode = {coordinates: coordinates2, distance: number|null, pre: coordNode|null};

type graphElem = number; //graph中的值，为number代表步骤消耗，为string代表障碍

function initialMinHeap(graph: graphElem[][], start: coordinates2): coordNode[] {
    let resultHeap: coordNode[] = []; //不方便从索引1作为根节点，因为元素类型要求coordNode

    let startNode: coordNode = {coordinates: start, distance: 0, pre: null};

    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < graph[0].length; j++) {
            let tempPosition: coordinates2 = {x: i, y: j};

            if (!isLegalPosition(graph, tempPosition)) {
                continue;
            }

            let tempNode: coordNode = {coordinates: tempPosition, distance: null, pre: null};
            if (coordinatesIsSame(tempPosition, start)) { //扫描到起点
                tempNode.distance = 0;
            }

            if (isNeighbor(start, tempPosition)) {
                tempNode.distance = Number(graph[start.x][start.y]);
                tempNode.pre = startNode;
                // console.log(tempNode);
            }
            
            resultHeap = insertMinHeap(resultHeap, tempNode);
        }
    }

    return resultHeap;
}

function isNeighbor(pos1: coordinates2, pos2: coordinates2): boolean {
    let xAbs = Math.abs(pos1.x - pos2.x);
    let yAbs = Math.abs(pos1.y - pos2.y);

    return xAbs + yAbs === 1;
}

function isLegalPosition(graph: graphElem[][], position: coordinates2): boolean {
    if (position.x < 0 || position.y < 0) {
        throw new Error("isLegalPosition: positon的x轴、y轴的值必须非负");
    }
    if (position.x >= graph.length || position.y >= graph[0].length) {
        throw new Error("isLegalPosition: positon的坐标超过了graph的范围");
    }

    let positionVal = graph[position.x][position.y];

    if (!isNumber(positionVal)) {
        return false;
    }

    return true;
}


function isNumber(val: graphElem): boolean {
    return typeof val === 'number' && isFinite(val);
}

function insertMinHeap(heap: coordNode[], node: coordNode): coordNode[] {
    let lastIndex: number = -1;
    
    for (let i = 0; i < heap.length; i++) {
        if (heap[i].distance !== null) {
            lastIndex++;
        }
    }

    //这里的复杂度太高了！
    if (lastIndex < 0) {
        heap.unshift(node);
    }
    else {
        let leftHeap = heap.slice(0, lastIndex+1);
        let rightHeap = heap.slice(lastIndex+1);

        heap = leftHeap.concat(node).concat(rightHeap);
    }

    let insertIndex = lastIndex+1;
    let fatherIndex = Math.floor((insertIndex-1)/2);

    // heap.push(node);
    // let insertIndex = heap.length-1;
    // let fatherIndex = Math.floor((insertIndex-1)/2);

    while (insertIndex !== 0) {
        let insertNode = heap[insertIndex];
        let fatherNode = heap[fatherIndex];

        if (insertNode.distance === null) { //insertNode的distance为null，则不用调整堆
            break;
        }
        else if (fatherNode.distance === null) {
            heap = exchangeInHeap(heap, insertIndex, fatherIndex); //用insertIndex、fatherIndex而不是insertNode、fatherNode合适吗
        }
        else if (insertNode.distance < fatherNode.distance) {
            heap = exchangeInHeap(heap, insertIndex, fatherIndex);
        }
        // else if (isRightChild) {

        // }
        else { //父结点的值<=子结点的值，已经满足堆的结构，退出循环
            break;
        }

        insertIndex = fatherIndex;
        fatherIndex = Math.floor((fatherIndex-1)/2);
    }

    return heap;
}

function exchangeInHeap(heap: coordNode[], firstIndex: number, secondIndex: number): coordNode[] {
    if (firstIndex < 0 || secondIndex < 0) {
        throw new Error("exchangeInHeap: firstIndex和secondIndex的值不能小于0")
    }
    if (firstIndex >= heap.length || secondIndex >= heap.length) {
        throw new Error("exchangeInHeap: firstIndex和secondIndex的值不能大于heap数组的范围")
    }

    let temp: coordNode = heap[firstIndex];
    heap[firstIndex] = heap[secondIndex];
    heap[secondIndex] = temp;

    return heap;
}

function coordinatesIsSame(pos1: coordinates2, pos2: coordinates2) {
    if (pos1.x !== pos2.x) {
        return false;
    }
    if (pos1.y !== pos2.y) {
        return false;
    }

    return true;
}

function heapIsEmpty(heap: coordNode[]) {
    return heap.length === 0;
}

function getMinValueInMinHeap(heap: coordNode[]): coordNode {
    if (heap.length === 0) {
        throw new Error("getMinValueInMinHeap: heap已经为空, 没有最小结点");
    }

    return heap[0];
}

function hasChildInHeap(heap: coordNode[], index: number): boolean {
    let leftChildIndex = (index+1)*2-1;
    if (leftChildIndex >= heap.length) {
        return false;
    }
    
    return true;
}

function deleteMinValueInMinHeap(heap: coordNode[]): coordNode[] {
    if (heap.length === 0) {
        throw new Error("deleteMinValueInMinHeap: heap已经为空, 不能进行删除");
    }

    if (heap.length === 1) {
        return [];
    }

    //不应该选择堆的最后一个元素，应该选择堆中distance不为0的最后一个元素
    let lastIndex: number = -1;
    // console.log(heap.length);
    for (let i = 0; i < heap.length; i++) {
        if (heap[i].distance !== null) {
            lastIndex++;
        }
    }
    // console.log(heap);
    // console.log(lastIndex);

    if (lastIndex === -1) {
        throw new Error("deleteMinValueInMinHeap: heap中所有结点的distance都为null");
    }

    heap[0] = heap[lastIndex]; 
    let heapLeft = heap.slice(0, lastIndex);
    let heapRight = heap.slice(lastIndex+1);
    heap = heapLeft.concat(heapRight);

    let index = 0;

    // console.log(heap);
    while (hasChildInHeap(heap, index)) {
        let indexNode: coordNode = heap[index];
        // console.log(indexNode);
        if (indexNode.distance === null) {
            //如果逻辑没有问题，抛出这个错误代表没有到终点的路径
            // console.log(indexNode);
            throw new Error("deleteMinValueInMinHeap: heap的第一个元素的distance为null");
        }

        let leftChildIndex = (index+1)*2-1;
        let rightChildIndex = leftChildIndex+1;

        let leftChildNode: coordNode = heap[leftChildIndex];
        // console.log(leftChildNode);

        if (leftChildNode.distance === null) {
            break;
        }

        let exchangeIndex: number|null = null;

        if (leftChildNode.distance < indexNode.distance) {
            exchangeIndex = leftChildIndex;
        }
        // console.log(exchangeIndex);
        if (rightChildIndex < heap.length) {
            let rightChildNode = heap[rightChildIndex];
            // console.log(22);
            // console.log(rightChildNode);
            if (rightChildNode.distance !== null) {
                // console.log(3);
                if (rightChildNode.distance <= leftChildNode.distance) {
                    exchangeIndex = rightChildIndex;
                    // console.log(111);
                }
            }
        }
        // console.log(exchangeIndex);
        if (exchangeIndex !== null) {
            // console.log(44);
            heap = exchangeInHeap(heap, index, exchangeIndex);
            index = exchangeIndex;
        }
        if (exchangeIndex === null) {
            break;
        }
    }

    return heap;
}

function renewDistanceAndPre(graph: graphElem[][], heap: coordNode[], deletedNode: coordNode): coordNode[] {
    let deletedNodeCoord: coordinates2 = deletedNode.coordinates;

    for (let i = 0; i < heap.length; i++) {
        let tempNode: coordNode = heap[i];
        let tempNodeCoord = tempNode.coordinates;
        if (isNeighbor(tempNodeCoord ,deletedNode.coordinates)) {
            let tempDistance = graph[deletedNodeCoord.x][deletedNodeCoord.y];

            // if (!isNumber(tempDistance)) {
            //     throw new Error("")
            // }
            if (deletedNode.distance === null) {
                throw new Error("renewDistanceAndPre: ***")
            }

            if (tempNode.distance === null || deletedNode.distance + tempDistance < tempNode.distance) {
                tempNode.distance = deletedNode.distance + tempDistance;
                // console.log(tempNode);
                
                // coordNode中的pre和preArray矩阵有什么区别？
                tempNode.pre = deletedNode;
            }
        }
    }

    return heap;
}

function dijkstra(graph: graphElem[][], start: coordinates2, end: coordinates2): coordinates2[] {
    if (coordinatesIsSame(start, end)) {
        throw new Error("dijkstra: 起点和终点的坐标不能相同！");
    }
    if (!isLegalPosition(graph, start) || !isLegalPosition(graph, end)) {
        throw new Error("dijkstra: start或end的位置非法");
    }

    let scanedNodeArray: boolean[][] = new Array(graph.length).map(() => new Array(graph[0].length).fill(false));
    let heap: coordNode[] = initialMinHeap(graph, start); //根据distance初始化所有结点(包括起点)。初始化结点的pre属性:只需要将起点周围的结点的pre设置为起点就可以。用堆存储未遍历的位置。
    // console.log(heap);
    
    //下面这一行应该就不起什么作用了
    // let preNodeArray: (coordinates2|null)[][] = new Array(graph.length).map(() => new Array(graph[0].length).fill(null)); //存储每个点的前驱节点。没有找到前驱结点时，前驱结点用null表示
    let indexNode: coordNode|null = null;

    while (!heapIsEmpty(heap)) {
        // console.log(heap.length);
        if (heap[0].distance === null) {
            break;
        }
        // if (heap[0].pre === null) { //起点的pre应该是为null
        //     break;
        // }
        indexNode = getMinValueInMinHeap(heap); //删除堆中distance最小值的结点并返回被删除的结点。返回的结点要确保pre属性非空。并调整堆满足堆的定义
        // console.log(indexNode);
        // console.log(heap.length);
        // console.log(heap);
        heap = deleteMinValueInMinHeap(heap);
        // console.log(heap);
        let minDistance_Coord: coordinates2 = indexNode.coordinates;

        // if (minDistance_Node.pre === null) {
        //     throw new Error(`在preNodeArray中准备插入结点的前驱时,pre属性为null`);
        // }

        // preNodeArray[minDistance_Coord.x][minDistance_Coord.y] = minDistance_Node.pre;
        // console.log(heap);
        heap = renewDistanceAndPre(graph, heap, indexNode); //更新堆中结点的distance和pre。如果heap中结点的distance属性被刷新，那么该结点的pre改为minDistance_Coord
        // console.log(heap);

        if (coordinatesIsSame(minDistance_Coord, end)) {
            break;
        }
    }

    if (indexNode === null) {
        throw new Error("dijkstra: indexNode为null");
    }

    if (!coordinatesIsSame(indexNode.coordinates, end)) {
        throw new Error("dijkstra: 终点结点的pre为null, 没有起点到终点的路径");
    }

    let result: coordinates2[] = [];

    // let index: coordinates2 = end;

    while (!coordinatesIsSame(indexNode.coordinates, start)) {
        // console.log()
        result.push(indexNode.coordinates);
        
        let preNode: coordNode|null = indexNode.pre
        // console.log(preNode);
        if (preNode === null) {
            throw new Error(`逆序遍历结果路径过程中,结点(${indexNode.coordinates.x}, ${indexNode.coordinates.y})的前驱为null !`);
        }

        indexNode = preNode;
    }
    // console.log(result.length);
    result.push(start);

    result.reverse();

    return result;
}

// let graph = [[1, 1], [1, 2]];
// let graph = [[2, 2, 1], [2, 1, 1], [1, 1, 2]];
// let start: coordinates2 = {x: 1, y: 0};
// let end: coordinates2 = {x:0, y: 1};

// console.log(dijkstra(graph, start, end));


let 


