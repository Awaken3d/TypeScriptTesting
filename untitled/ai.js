var gameLogic;
(function (gameLogic) {
    /** Returns the initial Hare and Hounds board, which is a matrix containing ''. */
    function getInitialBoard() {
        return [['D', '', ''], ['D', '', '', 'B'], ['D', '', '']];
    }
    gameLogic.getInitialBoard = getInitialBoard;
    /**
     *
     *
     *     There cannot be a tie in hare and hounds
     *
     *
     */
    /*
     function isTie(board: Board): boolean {
     for (var i = 0; i < 3; i++) {
     for (var j = 0; j < 3; j++) {
     if (board[i][j] === '') {
     // If there is an empty cell then we do not have a tie.
     return false;
     }
     }
     }
     // No empty cells, so we have a tie!
     return true;
     }
     */
    /**
     * Return the winner (either 'D' or 'B') or '' if there is no winner.
     * The board is a matrix of size 3x3 containing either 'X', 'O', or ''.
     * E.g., getWinner returns 'X' for the following board:
     *     [['X', 'O', ''],
     *      ['X', 'O', ''],
     *      ['X', '', '']]
     */
    function getWinner(board) {
        var boardString = '';
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < board[i].length; j++) {
                var cell = board[i][j];
                boardString += cell === '' ? ' ' : cell;
            }
        }
        var win_patterns = [
            'XXX......',
            '...XXX...',
            '......XXX',
            'X..X..X..',
            '.X..X..X.',
            '..X..X..X',
            'X...X...X',
            '..X.X.X..'
        ];
        for (i = 0; i < win_patterns.length; i++) {
            var win_pattern = win_patterns[i];
            var x_regexp = new RegExp(win_pattern);
            var o_regexp = new RegExp(win_pattern.replace(/X/g, 'O'));
            if (x_regexp.test(boardString)) {
                return 'X';
            }
            if (o_regexp.test(boardString)) {
                return 'O';
            }
        }
        return '';
    }
    /**
     * Returns all the possible moves for the given board and turnIndexBeforeMove.
     * Returns an empty array if the game is over.
     */
    function getPossibleMoves(board, turnIndexBeforeMove) {
        var possibleMoves = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                try {
                    possibleMoves.push(createMove(board, i, j, turnIndexBeforeMove));
                }
                catch (e) {
                }
            }
        }
        return possibleMoves;
    }
    gameLogic.getPossibleMoves = getPossibleMoves;
    /**
     * Returns the move that should be performed when player
     * with index turnIndexBeforeMove makes a move in cell row X col.
     */
    function createMove(board, row, col, turnIndexBeforeMove) {
        if (!board) {
            // Initially (at the beginning of the match), the board in state is undefined.
            board = getInitialBoard();
        }
        if (board[row][col] !== '') {
            throw new Error("One can only make a move in an empty position!");
        }
        if (getWinner(board) !== '' || isTie(board)) {
            throw new Error("Can only make a move if the game is not over!");
        }
        var boardAfterMove = angular.copy(board);
        boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'X' : 'O';
        var winner = getWinner(boardAfterMove);
        var firstOperation;
        if (winner !== '' || isTie(boardAfterMove)) {
            // Game over.
            firstOperation = { endMatch: { endMatchScores: winner === 'X' ? [1, 0] : winner === 'O' ? [0, 1] : [0, 0] } };
        }
        else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            firstOperation = { setTurn: { turnIndex: 1 - turnIndexBeforeMove } };
        }
        var delta = { row: row, col: col };
        return [firstOperation, { set: { key: 'board', value: boardAfterMove } }, { set: { key: 'delta', value: delta } }];
    }
    gameLogic.createMove = createMove;
    function isMoveOk(params) {
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        try {
            // Example move:
            // [{setTurn: {turnIndex : 1},
            //  {set: {key: 'board', value: [['X', '', ''], ['', '', ''], ['', '', '']]}},
            //  {set: {key: 'delta', value: {row: 0, col: 0}}}]
            var deltaValue = move[2].set.value;
            var row = deltaValue.row;
            var col = deltaValue.col;
            var board = stateBeforeMove.board;
            var expectedMove = createMove(board, row, col, turnIndexBeforeMove);
            if (!angular.equals(move, expectedMove)) {
                return false;
            }
        }
        catch (e) {
            // if there are any exceptions then the move is illegal
            return false;
        }
        return true;
    }
    gameLogic.isMoveOk = isMoveOk;
})(gameLogic || (gameLogic = {}));
//# sourceMappingURL=ai.js.map