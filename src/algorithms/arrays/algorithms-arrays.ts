import { MCArray } from '../../arrays/main/arrays-main'

const array:MCArray<number> = new MCArray<number>(1, 2, 3);

function productArrayPuzzle(arr:MCArray<number>) {

    // Initialize Left Array
    let leftArr = new MCArray<number>(1);

    // Initialize Right Array
    let rightArr = new MCArray<number>(1);
    
    let p:number = 1;
    arr.forEach((v:number, i:number) => {
        leftArr[i] = p;
        p *= v;
    });

    p = 1;
    for (let i = arr.length - 1; i >= 0; i--) {
        rightArr[i] = p;
        p *= arr[i];
    }

    return leftArr.map((v:number, i:number) => v * rightArr[i])
}

console.log(productArrayPuzzle(array))