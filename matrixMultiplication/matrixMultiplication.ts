function getColumn(matrix: number[][], index: number): number[] {
    let result: number[] = [];
    for (let i = 0; i < matrix.length; i++) {
        let elem = matrix[i][index];
        result.push(elem);
    }

    return result;
}

function vectorMulti(vector1: number[], vector2: number[]) {
    let result = 0;
    for (let i = 0; i < vector1.length; i++) {
        let tempResult = vector1[i] * vector2[i];
        result += tempResult;
    }
    return result;
}

// function getEmptyMatrix(row: number, column: number): number[] {
//     let result: number[] = [];
//     for (let i = 0; i < row; i++) {
//         result.push([])
//     }

//     return result;
// }

function matrixMultiplication(matrix1, matrix2) {
    if (matrix1[0].length !== matrix2.length) {
        throw Error("The two matrix cannot execute multiplicaiton");
    }    

    // let result = getEmptyMatrix(matrix1.length, matrix2.length);
    let result = Array(matrix1.length).fill(0).map(x => Array(matrix2[0].length).fill(0));

    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix2[0].length; j++) {
            let matrix1Row = matrix1[i];
            let matrix2Column = getColumn(matrix2, j);

            let vectorMultiResult = vectorMulti(matrix1Row, matrix2Column);

            result[i][j] = vectorMultiResult;
        }
    }

    return result;
}

let a = [[1,2], [2,1]];
let b = [[3,1], [1,2]];

const matrix1 = [[1, 2], [3, 4]];
const matrix2 = [[1, 2], [3, 4]];
//结果2×2 7,10,15,22

const matrix3 = [[1, 2, 1], [2, 1, 2]];
const matrix4 = [[1, 2], [2, 1], [1, 1]];
//结果2×2 6,5,6,7

// let result = matrixMultiplication(matrix3, matrix4);
// console.log(result);

let testArray = Array(2).fill().map(x => Array(2).fill());
// testArray[0][0] = 0;
console.log(testArray);