interface node<T> {
    val: T,
    left: node<T> | null,
    right: node<T> | null
}

function createNewNode(val: number): node<number> {
    return {
        val: val,
        left: null,
        right: null
    }    
}

//inert new node in binary search tree;
function insertNode(root: node<number>|null, val: number): node<number> {
    if (root === null) {
        let newNode: node<number> = {val: val, left: null, right: null};
        return newNode;
    }
    if (val === root.val) { //树中已经有该值结点，对树不做改动
        return root;
        // throw new Error("insertNode: 已经插入等于该值的结点")
    }
    if (val < root.val) { 
        root.left = insertNode(root.left, val);
    }
    else { // val > root.val
        root.right = insertNode(root.right, val);
    }

    return root;
}

//search a node
function searchNode(root: node<number>|null, val: number): boolean {
    if (root === null) {
        return false;
    }
    if (root.val === val) {
        return true;
    }
    if (root.val > val) {
        return searchNode(root.left, val);
    }
    else { // root.val < val
        return searchNode(root.right, val);
    }
}

//删除树中值最大的结点，返回根结点
function deleteMaxNode(root: node<number>|null): node<number>|null {
    if (root === null) {
        throw new Error("该树为空,没有可删除结点");
    }
    if (root.left === null && root.right === null) {
        return null;
    }
    if (root.right) {
        root.right = deleteMaxNode(root.right);
    }

    if (root.left) { //此时最大的结点就是root，但该结点还有左子树
        return root.left;
    }

    return root;
}

//删除树中值最小的结点，返回根结点
function deleteMinNode(root: node<number>|null): node<number>|null {
    if (root === null) {
        throw new Error("该树为空,没有可删除结点");
    }
    if (root.left === null && root.right === null) {
        return null;
    }
    if (root.left) { 
        root.left = deleteMinNode(root.left);
    }

    if (root.right) { //此时最小的结点就是root，但root还有右子树
        return root.right;
    }

    return root;
}


//找到树中最小值的结点，返回值最小的那个结点
function findMinNode(root: node<number>|null): node<number> {
    if (root === null) {
        throw new Error("findMinNode: 树为空，没有值最小的结点")
    }
    while (root.left) {
        root = root.left;
    }
    return root;
}

//删除给定值的一个结点
function deleteNodeByVal(root: node<number>|null, val: number): node<number>|null {
    if (root === null) {
        throw new Error("deleteNode: 找不到值为val的结点");
    }
    if (root.val > val) {
        root.left = deleteNodeByVal(root.left, val);
    }
    else if (root.val < val) {
        root.right = deleteNodeByVal(root.right, val);
    }
    else { //root.val === val
        if (root.left === null && root.right === null) { //被删除的结点是叶子结点
            return null;
        }
        if (root.left === null) {
            return root.right;
        }
        if (root.right === null) {
            return root.left;
        }
        else { //两边都不为空
            let rightMinNode: node<number> = findMinNode(root.right);
            root.val = rightMinNode.val;
            root.right = deleteNodeByVal(root.right, rightMinNode.val);
        }
    }

    return root;
}

//二叉树的中序遍历，返回一个数组
function inOrder(root: node<number>|null): number[] {
    function inOrderRecur(root: node<number>|null): void {
        if (root === null) {
            return;
        }

        inOrderRecur(root.left);
        result.push(root.val);
        inOrderRecur(root.right);
    }

    let result: number[] = [];

    inOrderRecur(root);

    return result;
}

//检查删除结点的函数deleteNodeByVal()是否正确删除树中的结点
// function checkDeleteNodeFunction(root: node<number>|null, deleteVal: number, deleteNodeFunction:(beforeDeleteTree:node<number>|null, val: number) => node<number>|null): boolean {
//     if (root === null) {
//         throw new Error("checkDeleteNodeFunction:给定的树已经为空，无法进行删除");
//     }

//     let afterDeleteTree: node<number>|null = deleteNodeFunction(root, deleteVal);

//     let result: boolean = checkDeleteIsCorrect(root, afterDeleteTree);
    
//     return result;
// }

// 检查二叉搜索树删除结点操作是否正确：
// 1.被删除的结点已经没有了。
// 2.没被删除的其他结点都有。
// 3.符合二叉搜索树的左小右大规则。=>中序遍历后，值按从小到大排列。
// 4.被删除结点之前的结点，和原二叉树完全一致
// function checkDeleteIsCorrect(beforeDeleteTree: node<number>|null, afterDeleteTree: node<number>|null) {
//     if (beforeDeleteTree === null) {
//         throw new Error("checkDeleteIsCorrect: 要删除的树不能为空");
//     }
    
//     let beforeInOrder: number[] = inOrder(beforeDeleteTree);
//     let afterInOrder: number[] = inOrder(afterDeleteTree);

//     if (beforeInOrder.length !== afterInOrder.length+1) { //删除操作后，树中会少一个元素
//         return false;
//     }

//     for (let i = 0; i < afterInOrder.length; i++) { //怎么减少时间复杂度
//         if(!beforeInOrder.includes(afterInOrder[i])) {
//             return false;
//         }
//     }

//     // 怎样判断删除正确了

// }


// Test函数目标：
// 1.给定一个空树tree
// 2.在[0,20]区间内，随机生成10个不重复的数
// 3.对tree连续执行10次插入操作
// 4.根据第二步的区间，选一个数作为要删除的结点
// 5.删除结点
// 6.检查删除结点后，二叉搜索树还是否正确
// function Test(testTimes: number, nodeValLowerBound: number, nodeValUpperBound: number, nodeNumber: number): void {
//     let successTimes = 0;
    
//     for (let i = 0; i < testTimes; i++) {
//         // let newNode: node<number>|null = null;

//         let randomArray: number[] = genRandomNoRepeatArray(nodeValLowerBound, nodeValUpperBound, nodeNumber);
//         let randomBinaryTree: node<number> = gen_BST_ByArray(randomArray);

//         // let deleteNodeVal: number = Math.floor(Math.random()*randomArray.length);

//         let result = checkDeleteNodeFunction(randomBinaryTree, deleteMaxNode);

//         if (result) {
//             successTimes++;
//         }
//     }

//     console.log(successTimes);
// }



