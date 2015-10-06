type Board = string[][];
export const ROWS: number = 9;
export const COLS: number = 17;
export const PLACES: BoardDelta[] = [{row: 0, col: 4}, {row: 0, col: 6}, {row: 0, col: 8},
    {row: 0, col: 10}, {row: 0, col: 12}, {row: 1, col: 3}, {row: 1, col: 5}, {row: 1, col: 7},
    {row: 1, col: 9}, {row: 1, col: 11}, {row: 1, col: 13}, {row: 2, col: 2}, {row: 2, col: 4},
    {row: 2, col: 6}, {row: 2, col: 8}, {row: 2, col: 10}, {row: 2, col: 12}, {row: 2, col: 14},
    {row: 3, col: 1}, {row: 3, col: 3}, {row: 3, col: 5}, {row: 3, col: 7},
    {row: 3, col: 9}, {row: 3, col: 11}, {row: 3, col: 13}, {row: 3, col: 15},
    {row: 4, col: 2}, {row: 4, col: 2}, {row: 4, col: 4},{row: 4, col: 6}, {row: 4, col: 8},
    {row: 4, col: 10}, {row: 4, col: 12}, {row: 4, col: 14}, {row: 4, col: 16},
    {row: 5, col: 1}, {row: 5, col: 3}, {row: 5, col: 5}, {row: 5, col: 7},
    {row: 5, col: 9}, {row: 5, col: 11}, {row: 5, col: 13}, {row: 5, col: 15},
    {row: 6, col: 2}, {row: 6, col: 4}, {row: 6, col: 6}, {row: 6, col: 8}, {row: 6, col: 10},
    {row: 6, col: 12}, {row: 6, col: 14},
    {row: 7, col: 3}, {row: 7, col: 5}, {row: 7, col: 7},
    {row: 7, col: 9}, {row: 7, col: 11}, {row: 7, col: 13},
    {row: 8, col: 4}, {row: 8, col: 6}, {row: 8, col: 8},
    {row: 8, col: 10}, {row: 8, col: 12} ];
function getEmptyBoard(): Board {
    let board: Board = [];
    for (let i = 0; i < ROWS; i++) {
        board[i] = [];
        for (let j = 0; j < COLS; j++) {
            board[i][j] = '';
        }
    }
    for (let place of PLACES) {
        let i = place.row;
        let j = place.col;
        board[i][j] = 'O';
    }
    return board;
}
