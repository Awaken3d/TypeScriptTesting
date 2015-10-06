/**
 * Created by Nick on 9/24/2015.
 */
function arraysEqual(arr1, arr2) {
    if(arr1 == null || arr2 == null){
        return false;
    }
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

interface coord{
    col:number;
    row:number;
}

var a:any = [[[1,2],[2,3]],[[0,3],[9,2]]];

var legalMovesDog: any = [[[[0,1],[1,1],[1,2]], [[0,2], [1,2]], [[1,3], [1,4]]],
                         [[[0,0], [1,1], [2,0]], [[0,0], [1,2], [2,0]], [[0,1], [2,1], [0,2], [1,3],[2,2]],
                           [[0,2], [2,2], [1,4]] , []],[[[1,1], [1,2], [2,1]],[[1,2], [2,2]], [[1,3], [1,4]]]];

var legalMovesBunny: any = [[[[1,0],[0,1],[1,1],[1,2]], [[0,0],[0,2], [1,2]], [[0,1],[1,2],[1,3], [1,4]]],
                           [[], [[0,0], [1,2], [2,0]], [[0,0],[2,1],[1,1],[0,1], [2,1], [0,2], [1,3],[2,2]],
                            [[1,2],[0,2], [2,2], [1,4]] , [[0,2], [1,3], [2,2]]],
                           [[[1,0],[1,1], [1,2], [2,1]],[[2,0],[1,2],[2,2]], [[2,1],[1,3], [1,4]]]];

var nextMove:coord = {row:1, col:2}, previousMove:coord = {row:1, col:1};
//nextMove.row = 1;
//nextMove.col = 1;
var nextMoveArray:number[] = [];

nextMoveArray.push(nextMove.row);
nextMoveArray.push(nextMove.col);
console.log(nextMoveArray);
console.log(legalMovesDog[previousMove.row][previousMove.col]);

for(var u in legalMovesDog[previousMove.row][previousMove.col]){
    console.log(legalMovesDog[previousMove.row][previousMove.col][u]);
    if(arraysEqual(nextMoveArray, legalMovesDog[previousMove.row][previousMove.col][u])){
        console.log(" valid move ");
    }else{
        console.log(" illegal move ");
    }
}

console.log(" printing bunny moves ");
for(var u in legalMovesBunny[previousMove.row]){
    console.log(legalMovesBunny[previousMove.row][u]);
    console.log(" next element ");

}
var b:any = [1,6];
var c:any = [1,2];
//console.log(a[0][0]);
//console.log(c);
console.log(arraysEqual(a[1][4], b));
console.log(arraysEqual(a[1][4], c));
//console.log(c === a[0][0]);
for(var i in a){
    console.log(a[i]);
}