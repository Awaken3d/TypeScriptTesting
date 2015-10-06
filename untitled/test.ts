interface IIsMoveOk {
    move: IMove;
    pawnId:number;
    turnIndexBeforeMove : number;
    turnIndexAfterMove: number;
    stateBeforeMove: IState;
    //stateAfterMove: IState;
    //numberOfPlayers: number;
}
interface ISet {
    key: string;
    value: any;
    visibleToPlayerIndexes?: number[];
}
interface ISetVisibility {
    key: string;
    visibleToPlayerIndexes?: number[];
}
interface ISetRandomInteger {
    key: string;
    from: number;
    to: number;
}
interface IDelete {
    key: string;
}
interface IShuffle {
    keys: string[];
}
interface ISetTurn {
    turnIndex: number;
}
interface IEndMatch {
    endMatchScores: number[];
}
interface IOperation {
    set?: ISet;
    setVisibility?: ISetVisibility;
    setRandomInteger?: ISetRandomInteger;
    delete?: IDelete;
    shuffle?: IShuffle;
    setTurn?: ISetTurn;
    endMatch?: IEndMatch;
}
declare type IMove = IOperation[];
type Board = string[][];
interface BoardDelta {
    row: number;
    col: number;
}
interface IState {
    board?: Board;
    delta?: BoardDelta;
}

module gameLogic {

    export var legalMovesDog: any = [[[[0,1],[1,1],[1,2]], [[0,2], [1,2]], [[1,3], [1,4]]],
        [[[0,0], [1,1], [2,0]], [[0,0], [1,2], [2,0]], [[0,1], [2,1], [0,2], [1,3],[2,2]],
            [[0,2], [2,2], [1,4]] , []],[[[1,1], [1,2], [2,1]],[[1,2], [2,2]], [[1,3], [1,4]]]];

    export var legalMovesBunny: any = [[[[1,0],[0,1],[1,1],[1,2]], [[0,0],[0,2], [1,2]], [[0,1],[1,2],[1,3], [1,4]]],
        [[], [[0,0], [1,2], [2,0]], [[0,0],[2,1],[1,1],[0,1], [2,1], [0,2], [1,3],[2,2]],
            [[1,2],[0,2], [2,2], [1,4]] , [[0,2], [1,3], [2,2]]],
        [[[1,0],[1,1], [1,2], [2,1]],[[2,0],[1,2],[2,2]], [[2,1],[1,3], [1,4]]]];

    export interface playerPosition{
        line:number;
        column:number;
    }
    export var bunnyPosition:playerPosition = {line:0,column:0};
    export var dogPosition:playerPosition[] = [{line:0,column:0},{line:0,column:0},{line:0,column:0}];
    export function setInitialPositions():void{
        bunnyPosition.line = 1;
        bunnyPosition.column = 4;
        dogPosition[0].line = 0;
        dogPosition[0].column = 0;
        dogPosition[1].line = 1;
        dogPosition[1].column = 0;
        dogPosition[2].line = 2;
        dogPosition[2].column = 0;


    }

    var turnsTake:number = 0;
    export function incrementTurn(){
        this.turnsTake++;
    }
    export function getTurns():number{
        return this.turnsTake;
    }

    export function getInitialBoard(): Board {
        //bunnyPosition.line =1;
        setInitialPositions();
        return [['D1', '', ''],
            ['D2','', '', '', 'B'],
            ['D3', '', '']];
    }
    //hounds can only win if the corner the bunny in the initial position
    export function bunnyBlocked(board:Board):boolean{

        if((board[1][4]=='B' && board[0][2].charAt(0) == 'D' && board[1][3].charAt(0) == 'D' && board[2][2].charAt(0) == 'D')||
            board[0][1]=='B' && board[0][0].charAt(0) == 'D' && board[1][2].charAt(0) == 'D' && board[0][2].charAt(0) == 'D'||
            board[2][1]=='B' && board[2][0].charAt(0) == 'D' && board[1][2].charAt(0) == 'D' && board[2][2].charAt(0) == 'D'){
            return true;
        }else {
            return false;
        }
    }
/*
    export function getPossibleMoves(board: Board, turnIndexBeforeMove: number): IMove[] {
        var possibleMoves: IMove[] = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < board[i].length; j++) {
                try {
                    possibleMoves.push(createMove(board, i, j, turnIndexBeforeMove));
                } catch (e) {
                    // The cell in that position was full.
                }
            }
        }
        return possibleMoves;
    }
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

    function copy(arr){
        var new_arr = arr.slice(0);
        for(var i = arr.length; i--;)
            if(new_arr[i] instanceof Array)
                new_arr[i] = copy(arr[i]);
        return new_arr;
    }

    export function createMove(
        board: Board,pawnID:number, row: number , col: number, turnIndexBeforeMove: number): IMove {
        var moveArray:number[] = [row, col];

        if (!board) {
            // Initially (at the beginning of the match), the board in state is undefined.
            board = getInitialBoard();
        }

        if (board[row][col] !== '') {
            throw new Error("One can only make a move in an empty position!");
        }


        if (getWinner(board) !== '') {
            throw new Error("Can only make a move if the game is not over!");
        }
        if(col < 0){
            throw new Error("Column value cannot be lower than 0");
        }

        if(row < 0){
            throw new Error("Row value cannot be lower than 0");
        }else if(row >2){
            throw new Error("Row value cannot be higher than 2");
        }

        if(row == 1 && col > 4 ){
            throw new Error("Column value is too high");
        }else if((row === 0 || row === 2) && col >2){
            throw new Error("Column value is too high");
        }

        if(turnIndexBeforeMove === 1){
            /*
            if((bunnyPosition.column == 1 && bunnyPosition.line == 0) || (bunnyPosition.column == 1 && bunnyPosition.line == 2)){
                if((col == 1 && row == 1)|| (col == 3 && row == 1)){
                    throw new Error("Cannot move there!");
                }
            }
            */

            /*
            if((bunnyPosition.column == 1 && bunnyPosition.line == 1) || (bunnyPosition.column == 3 && bunnyPosition.line == 1)){
                if((col == 1 && row == 0)|| (col == 1 && row == 2)){
                    throw new Error("Cannot move there!");
                }
            }
            */

            var existsInLegalMoves:boolean = false;
            for(var i in legalMovesBunny){
                if(arraysEqual(moveArray, legalMovesBunny[bunnyPosition.line][bunnyPosition.column][i])){
                    existsInLegalMoves = true;
                }
            }

            if(!existsInLegalMoves){
                throw new Error("Cannot move there!");
            }
            /*
            if((bunnyPosition.column - col < -1)|| (bunnyPosition.column - col > 1)){
                throw new Error("One can only make a move one cell at a time!");
            }
            if((bunnyPosition.line - row < -1)||(bunnyPosition.line - row > 1)){
                throw new Error("One can only make a move one cell at a time!");
            }
            */
        }else{
            var id:number;
            if(pawnID == 1){
                id = 0;
            }else if(pawnID == 2){
                id =1;
            }else{
                id = 2;
            }
            /*
            if(dogPosition[id].column > col){
                throw new Error("Dogs can only move forward!");
            }
            */

            var existsInLegalMoves2:boolean = false;

            for(var i in legalMovesDog){
                if(arraysEqual(moveArray, legalMovesDog[dogPosition[id].line][dogPosition[id].column][i])){
                    existsInLegalMoves2 = true;
                }
            }

            if(!existsInLegalMoves2){
                throw new Error("Cannot move there!");
            }

            /*
            if((dogPosition[id].column == 1 && dogPosition[id].line == 0) || (dogPosition[id].column == 1 && dogPosition[id].line == 2)){
                if(col == 3 && row == 1){
                    throw new Error("Cannot move there!");
                }
            }
            if((dogPosition[id].column - col < -1)|| (dogPosition[id].column - col > 1)){
                throw new Error("One can only make a move one cell at a time!");
            }
            if((dogPosition[id].line - row < -1)||(dogPosition[id].line - row > 1)){
                throw new Error("One can only make a move one cell at a time!");
            }
            */
        }
       // var boardAfterMove = angular.copy(board);
        var boardAfterMove = copy(board);
        boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'D' : 'B';
        if(turnIndexBeforeMove === 1){
            boardAfterMove[bunnyPosition.line][bunnyPosition.column] = '';
            boardAfterMove[row][col] = 'B';
            bunnyPosition.line = row;
            bunnyPosition.column = col;
        }else{
            boardAfterMove[dogPosition[pawnID-1].line][dogPosition[pawnID-1].column] = '';
            boardAfterMove[row][col] = 'D'+""+(pawnID);
            dogPosition[pawnID-1].line = row;
            dogPosition[pawnID-1].column = col;
        }
        var winner = getWinner(boardAfterMove);
        var firstOperation: IOperation;
        if (winner !== '' ) {
            // Game over.
            firstOperation = {endMatch: {endMatchScores:
                winner === 'D' ? [1, 0] : winner === 'B' ? [0, 1] : [0, 0]}};
        } else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
        }
        var delta: BoardDelta = {row: row, col: col};

        for(var i in boardAfterMove){
            for(var j in boardAfterMove[i]){
                console.log(boardAfterMove[i][j]);
            }
        }

        return [firstOperation,
            {set: {key: 'board', value: boardAfterMove}},
            {set: {key: 'delta', value: delta}}];
    }

    export function getWinner(board: Board): string {
       // var counter : turnCounter = new turnCounter();

        if(bunnyPosition.column <= dogPosition[0].column &&
            bunnyPosition.column <= dogPosition[1].column &&
            bunnyPosition.column <= dogPosition[3].column){
            return 'B';
        }else if(getTurns()==20){
            return 'B';
        }else if(bunnyBlocked(board)){
            return 'D';
        }

        return '';

    }

    export function isMoveOk(params: IIsMoveOk): boolean {
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove: IState = params.stateBeforeMove;
        var pawnId:number = params.pawnId;
        // The state and turn after move are not needed in TicTacToe (or in any game where all state is public).
        //var turnIndexAfterMove = params.turnIndexAfterMove;
        //var stateAfterMove = params.stateAfterMove;

        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that move is legal.
        try {
            // Example move:
            // [{setTurn: {turnIndex : 1},
            //  {set: {key: 'board', value: [['X', '', ''], ['', '', ''], ['', '', '']]}},
            //  {set: {key: 'delta', value: {row: 0, col: 0}}}]
            //var deltaValue: BoardDelta = move[2].set.value;
            //var row = deltaValue.row;
            //var col = deltaValue.col;
            var row = move[2].set.value.row;
            var col = move[2].set.value.col;

            var board = stateBeforeMove.board;
            //console.log(board);
            /*for(var j=0;j<3;j++){
             for(var i =0 ;i<board[j].length;i++){

             console.log(j+" "+i+" "+board[j][i]);
             }
             }*/
            var expectedMove = createMove(board,pawnId, row, col, turnIndexBeforeMove);
           // if(!arraysEqual(move[2], expectedMove[1].set.value)){
            //if (!angular.equals(move, expectedMove)) {
             //   return false;
            //}
        } catch (e) {
            // if there are any exceptions then the move is illegal

            console.log(e);
            return false;
        }
        incrementTurn();
        return true;
    }
}
var b:Board = gameLogic.getInitialBoard();
//b[1][4]='B';
//b[0][2] = 'D';
//b[1][3] = 'D';
//b[2][2] = 'D';
//b[1][3] = 'B';
//console.log(b[1][4]+" "+b[1][3]);
//console.log(gameLogic.getWinner(b));
//var c:Board;
//console.log(b[0][1]);
//var mov:IMove = gameLogic.createMove(b,2,1,1,0);
//b = mov[1].set.value;
/*for(var j=0;j<3;j++){
    for(var i =0 ;i<b[j].length;i++){

        console.log(j+" "+i+" "+b[j][i]);
    }
}*/

var coordinates:BoardDelta = {row:1, col:1};

var set1:ISet = {key:"delta",value:coordinates};

var lastSet:IOperation = {set:set1};
var moveTest:IMove = [lastSet,lastSet,lastSet];

var state:IState = {board:b};
var state2:IState = {board:undefined};
//console.log(gameLogic.dogPosition[1].line);

var parTest:IIsMoveOk = {move:moveTest,pawnId:1,turnIndexBeforeMove:0, turnIndexAfterMove:1,stateBeforeMove:state2};
var result:boolean = gameLogic.isMoveOk(parTest);
console.log(result);
/*move: IMove;
pawnId:number;
turnIndexBeforeMove : number;
turnIndexAfterMove: number;
stateBeforeMove: IState;
stateAfterMove: IState;
numberOfPlayers: number;*/


/*interface IOperation {
    set?: ISet;
    setVisibility?: ISetVisibility;
    setRandomInteger?: ISetRandomInteger;
    delete?: IDelete;
    shuffle?: IShuffle;
    setTurn?: ISetTurn;
    endMatch?: IEndMatch;
}*/

//gameLogic.isMoveOk()
//console.log(mov[0].setTurn.turnIndex);
//var mov:IMove = gameLogic.createMove(b,)




