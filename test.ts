// 方法二：
// type node<T> = {
//     val: T;
//     next: node<T> | null;
// };

// type linkedList<T> = {
//     head: node<T>;
//     tail: node<T>;
// } | {
//     head: null;
//     tail: null;
// };

// let newNode: node<number> = {val: 1, next: null};

// let a: linkedList<number> = {head: newNode, tail: null};

// interface node<T> {
//     val:T;
//     next: node<T> | null;
// }

// //怎样保证head和tail要么同时为空，要么同时都不为空
// interface linkedList<T> {
//     head: node<T>;
//     tail: node<T>;
//     // head: Nullable extends true ? node<T> | null : node<T>;
//     // tail: Nullable extends true ? node<T> | null : node<T>;
// } 

interface node<T> {
    val: T;
    next: node<T> | null;
}

interface LinkedList<T, Nullable extends boolean = false> {
    head: Nullable extends true ? null : node<T>;
    tail: Nullable extends true ? null : node<T>;
}

let node1: node<number> = {val: 1, next: null};
let linkedList1 = {head: node1, tail: null};