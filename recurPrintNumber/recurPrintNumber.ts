function recurDown(val: number): void {
    if (val < 0) {
        return;
    }
    console.log(val);
    recurDown(val-1);
}

function recurUp(val: number): void {
    if (val < 0) {
        return;
    }
    
    recurUp(val-1);
    console.log(val);
}

function recurDownRange(left: number, right: number): void {
    if (left > right) {
        return;
    }

    console.log(right);
    recurDownRange(left, right-1);
}

function recurUpRange(left: number, right: number): void {
    if (left > right) {
        return;
    }

    recurUpRange(left, right-1);
    console.log(right);
}


//参数down为true时，向下递归；参数down为false时，向上递归
function recurRange(val: number, down: boolean): void {
    if (val < 0) {
        return;
    }
    
    if (down) {
        console.log(val);
    }
    recurRange(val-1, down);
    if (!down) {
        console.log(val);
    }
}

//正序形成数组
function recurUpArr(val: number): number[] {
    if (val < 0) {
        return [];
    }

    let result = recurUpArr(val-1);
    result.push(val);

    return result;
}

//逆序形成数组
function recurDownArr(val: number): number[] {
    if (val < 0) {
        return [];
    }

    let result = recurDownArr(val-1);
    result.unshift(val);

    return result;
}

//两个数之间的正序数组
function recurUpArr2(left: number, right: number): number[] {
    if (left > right) {
        return [];
    }

    let result = recurUpArr2(left, right-1);
    result.push(right);

    return result;
}

//两个数之间的逆序数组
function recurDownArr2(left: number, right: number): number[] {
    if (left > right) {
        return [];
    }

    let result = recurDownArr2(left+1, right);
    result.push(left);

    return result;
}


console.log(recurUpArr2(2, 5));
