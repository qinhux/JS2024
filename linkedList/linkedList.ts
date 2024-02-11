interface node<T> {
    val:T;
    next: node<T> | null;
}

//怎样用interface保证head和tail要么同时为空，要么同时都不为空
interface linkedList<T> {
    head: node<T> | null;
    tail: node<T> | null;
    // head: Nullable extends true ? node<T> | null : node<T>;
    // tail: Nullable extends true ? node<T> | null : node<T>;
}

// 方法二：
// type node<T> = {
//     val: T;
//     next: node<T> | null;
// };

// type linkedList<T> = {
//     head: node<T>|null;
//     tail: node<T>|null;
// } | {
//     head: null;
//     tail: null;
// };


function newLinkedList<T>(): linkedList<T> {
    return {
        head: null,
        tail: null,
    }
}


function countNodeNumber(linkedList: linkedList<number>): number {
    let result = 0;
    let indexNode: node<number>|null = linkedList.head;
    while (indexNode !== null) {
        result++;
        indexNode = indexNode.next;
    }

    return result;
}

function printLinkedList(linkedList: linkedList<number>): void {
    let indexNode = linkedList.head;
    while (indexNode !== null) {
        console.log(indexNode.val);
        if (indexNode.next !== null) {
            console.log("->")
        }
    }
}

function insertAtHead(linkedList: linkedList<number>, val: number): linkedList<number> {
    let newNode: node<number> = {val: val, next: null};
    
    if (linkedList.head === null) { //linkedList为空
        linkedList.head = newNode;
        linkedList.tail = newNode;
    }
    else { //linkedList不为空
        let oldHead = linkedList.head;
        newNode.next = oldHead;
        linkedList.head = newNode;
    }

    return linkedList;
}

function insertAtTail(linkedList: linkedList<number>, val: number): linkedList<number> {
    let newNode: node<number> = {val: val, next: null};
    
    if (linkedList.tail === null) { //linkedList为空
        linkedList.head = newNode;
        linkedList.tail = newNode;
    }
    else { //linkedList不为空
        let oldTail = linkedList.tail;
        oldTail.next = newNode;
        linkedList.tail = newNode;
    }

    return linkedList;
}

//返回链表的第position个结点，第一个结点的位置为0
function findNodeByPosition(linkedList: linkedList<number>, position: number):node<number> {
    if (linkedList.head === null) {
        throw new Error("findNodeByPosition function: linkedList is empty");
    }
    if (position < 0) {
        throw new Error("findNodeByPosition function: parameter 'position' must be larger than 0");
    }

    let indexNode: node<number>|null = linkedList.head;
    let indexPosition: number = position;
    while (indexPosition !== 0 && indexNode !== null) {
        indexNode = indexNode.next;
        indexPosition--;
    }

    if (indexNode !== null) {
        return indexNode;
    }
    else {
        throw new Error("findNodeByPosition function: position大于等于结点总数,已超过范围")
    }
}

//在指定位置插入结点。position为0作为头插，position为1代表在第一个结点后面插
function insertAtPosition(linkedList: linkedList<number>, val: number, position: number): linkedList<number> {    

    //在指定位置插入结点，如果position大于等于结点数，当做尾插
    function insertNode(head: node<number>, val: number, position: number): void {
        let indexNode = head;
        let indexPosition = position;
        
        while (indexPosition > 1 && indexNode.next !== null) { // >1是为了找到前一个结点
            indexNode = indexNode.next;
            indexPosition--;
        }

        let newNode: node<number> = {val: val, next: null};

        newNode.next = indexNode.next;
        indexNode.next = newNode;
    }

    if (!Number.isInteger(position)) { //要求position为整数
        //另一种判断是否是整数的方法
        //typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        throw new Error("insertAtPosition: 插入的位置要求整数！");
    }

    if (linkedList.head === null) { //linkedList为空链表，不管position是多少，看做头插
        return insertAtHead(linkedList, val);
    }
    if (position === 0) { //变成头插
        return insertAtHead(linkedList, val);
    }

    if (position > 0) {
        // let nodeNumber = countNodeNumber(linkedList);

        // if (position >= nodeNumber) { //if parameter 'position'大于等于所有结点的总数，则当做尾插
        //     return insertAtTail(linkedList, val);
        // }

        // let preNode = findNodeByPosition(linkedList, position-1);

        // let newNode: node<number> = {val: val, next: null};

        // newNode.next = preNode.next;
        // preNode.next = newNode;

        // return linkedList;

        insertNode(linkedList.head, val, position);

        return linkedList;
    }

    else { //position < 0, 从后面开始插，-1代表尾插
        let linkedListNodeNumber = countNodeNumber(linkedList);
        if (Math.abs(position) >= (linkedListNodeNumber+1)) {
            return insertAtHead(linkedList, val);
        }

        return insertAtPosition(linkedList, val, linkedListNodeNumber+position+1);
    }
}

function deleteAtHead(linkedList:linkedList<number>): linkedList<number> {
    if (linkedList.head === null) { //linkedList本来就为空，不做删除，返回空链表
        
    }
    else if (linkedList.head === linkedList.tail) { //linkedList only have a element, return empty linkedList
        linkedList.head === null;
        linkedList.tail === null;
    }
    else { //linkedList at least have two elements
        let linkedListHead = linkedList.head;
        linkedList.head = linkedListHead.next;
    }

    return linkedList;
}

function deleteAtTail(linkedList:linkedList<number>): linkedList<number> {
    function findThelastButOneElement(linkedList: linkedList<number>): node<number> {
        if (linkedList.head === null) {
            throw new Error("linkedList is empty, it have not lastTwoElement");
        }
        if (linkedList.head.next === null) {
            throw new Error("linkedList only have one element, is hava not lastTwoElement")
        }

        let pre: node<number>|null = linkedList.head;
        let cur: node<number>|null = linkedList.head.next;
        while (cur.next !== null && pre.next !== null) { //&&后面的条件一定满足，但如果不写会报错
            pre = pre.next;
            cur = cur.next;
        }
        
        return pre;
    }

    if (linkedList.tail === null) { //linkedList本来就为空，不做删除，返回空链表
        
    }
    else if (linkedList.head === linkedList.tail) { //linkedList only have a element, return empty linkedList
        linkedList.head === null;
        linkedList.tail === null;
    }
    else { //linkedList at least have two elements
        // 找到倒数第二个元素
        let thelastButOneElement: node<number> = findThelastButOneElement(linkedList);
        thelastButOneElement.next = null;
        linkedList.tail = thelastButOneElement;
    }

    return linkedList;
}

function deleteAtPosition(linkedList: linkedList<number>, position: number): linkedList<number> {
    if (!Number.isInteger(position)) { //要求position为整数
        throw new Error("插入的位置要求整数！");
    }
    if (linkedList.tail === null || linkedList.head === null) { //linkedList本来就为空
        throw new Error("linkedList is already empty, there is no element to delete")
    }

    if (position === 0) {
        if (linkedList.head === linkedList.tail) {
            linkedList.tail = linkedList.tail.next;
        }
        linkedList.head = linkedList.head.next;
    }

    let nodeNumber = countNodeNumber(linkedList);

    if (position < 0) { //when the postion is less than 0, check the delete postion is whether legal;
        if (Math.abs(position) > nodeNumber) {
            throw new Error("the negative position is over the number of node in linkedList");
        }

        let newPosition = nodeNumber + position;
        return deleteAtPosition(linkedList, newPosition);
    }

    if (position > 0) {
        if (position >= nodeNumber) { //当链表总共2个结点，position最大只能为1，因为position为0代表删除第一个结点
            throw new Error("the positive position is over the number of node in linkedList");
        }

        let preNode = findNodeByPosition(linkedList, position-1); //找到前一个结点
        //下面一行这样写的效率很低，不这样写会提示错误，应该怎么改
        let curNode = findNodeByPosition(linkedList, position); //find the node which will be deleted
        // let deletedNode: node<number> = preNode.next;
        preNode.next = curNode.next;
    }

    return linkedList;
}


// 随机生成一个链表拥有的所有元素
// 生成对应元素的数组作为比较
// 随机在任意位置插入一个元素
// 比较链表的元素和数组的元素是否相同
function TestInsertAtPosition(insert: ((linkedList: linkedList<number>, val: number, position: number)=>linkedList<number>)) {

    //从[0, arrayLength*10]的范围内，随机选择arrayLength个不重复数字，返回数组
    function getRandomNoRepeatArray(arrayLength: number): number[] {
        // if (left > right) {
        //     throw new Error("getRandomNoRepeatArray: 左区间不能大于右区间");
        // }
        // let rangeLength: number = right-left+1;
        // if (rangeLength < arrayLength) {
        //     throw new Error("getRandomNoRepeatArray: 希望获得随机数的个数超过了区间长度");
        // }

        let result: number[] = [];
        let resultSet: Set<number> = new Set();
        while (result.length !== arrayLength) {
            let newEle = Math.floor(Math.random()*arrayLength*10);
            if (resultSet.has(newEle)) {
                continue;
            }
            result.push(newEle);
            resultSet.add(newEle);
        }

        return result;
    }
    
    //将数组转换为链表
    function arrayToLinkedList(array: number[]): linkedList<number> {
        let result: linkedList<number> = newLinkedList();

        for (let i = 0; i < array.length; i++) {
            result = insertAtTail(result, array[i]);
        }

        return result;
    }
    
    //将val值插入到数组中的指定位置
    function insertToArray(array: number[], val: number, position: number): number[] {
        if (!Number.isInteger(position)) { //要求position为整数
            throw new Error("insertToArray: 插入的位置要求整数！");
        }

        if (position === 0) {
            let result: number[] = [];
            result.push(val);
            result = result.concat(array);
            return result;
        }
        else if (position > 0) {
            if (position >= array.length) { 
                array.push(val);
                return array;
            }
            let left = array.slice(0, position);
            let right = array.slice(position);
            
            left.push(val);
            let result = left.concat(right);
            return result;
        }
        else { //position < 0;
            if (Math.abs(position) >= (array.length+1)) {
                array.unshift(val);
                return array;
            }

            return insertToArray(array, val, position+array.length+1);
        }
    }

    //生成随机的插入位置
    function genRandomInsertPos(arrayLength: number): number {
        if (!Number.isInteger(arrayLength)) {
            throw new Error("genRandomInsertPos: 输入的arrayLength应为整数");
        }
        if (arrayLength < 0) {
            throw new Error("genRandomInsertPos: 输入的arrayLength应为正数");
        }

        let positionLength: number = arrayLength*2+5;

        let randomPosition: number = Math.floor(Math.random()*positionLength) - arrayLength - 2;

        return randomPosition;
    }

    //检查链表和数组的元素是否按序相同
    function checkLinkedListAndArray(linkedList: linkedList<number>, array: number[]): boolean {
        let indexNode: node<number>|null = linkedList.head;

        if (indexNode === null && array.length === 0) {
            return true;
        }
        if (indexNode === null || array.length === 0) {
            return false;
        }

        let linkedListToArray: number[] = [];
        while (indexNode !== null) {
            linkedListToArray.push(indexNode.val);
            indexNode = indexNode.next;
        }

        if (linkedListToArray.length !== array.length) {
            console.log(linkedListToArray.length);
            console.log(array.length);
            return false;
        }

        for (let i = 0; i < array.length; i++) {
            if (array[i] !== linkedListToArray[i]) {
                return false;
            }
        }

        return true;
    }

    let randomArray: number[] = getRandomNoRepeatArray(1);
    let randomLinkedList: linkedList<number> = arrayToLinkedList(randomArray);

    let nodeValSet: Set<number> = new Set();
    for (let i = 0; i < randomArray.length; i++) {
        nodeValSet.add(randomArray[i]);
    }
    
    let insertTimes: number = 1000;

    let insertValArray: number[] = [];
    while (insertValArray.length !== insertTimes) {
        let tempInsertVal = Math.floor(Math.random()*(insertTimes+randomArray.length)*10); //在结点元素个数*10倍的范围内随机找结点的值
        if (nodeValSet.has(tempInsertVal)) {
            continue;
        }

        insertValArray.push(tempInsertVal);
        nodeValSet.add(tempInsertVal);
    }

    let afterInsertLinkedList: linkedList<number> = randomLinkedList;
    let afterInsertArray: number[] = randomArray;
    for (let i = 0; i < insertTimes; i++) {
        let insertPosition = genRandomInsertPos(afterInsertArray.length); //afterInsertArray数组的长度在变，所以在每次插入时再生成。

        afterInsertLinkedList = insert(afterInsertLinkedList, insertValArray[i], insertPosition);
        afterInsertArray = insertToArray(afterInsertArray, insertValArray[i], insertPosition);
    }

    let result: boolean = checkLinkedListAndArray(afterInsertLinkedList, afterInsertArray);

    return result;
}


let successTimes = 0;
for (let i = 0; i < 10; i++) {
    let result = TestInsertAtPosition(insertAtPosition);

    if (result === true) {
        successTimes++;
    }
}

console.log(successTimes);