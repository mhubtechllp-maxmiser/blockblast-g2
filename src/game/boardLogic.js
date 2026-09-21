import { BOARD_SIZE } from './constants';

/**
 * Creates an empty 8x8 game board filled with null.
 */
export function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
}

/**
 * Checks if a piece shape matrix can legally be placed at (startRow, startCol).
 */
export function canPlacePiece(board, matrix, startRow, startCol) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // Check boundaries
  if (startRow < 0 || startCol < 0) return false;
  if (startRow + numRows > BOARD_SIZE || startCol + numCols > BOARD_SIZE) return false;

  // Check collision
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (matrix[r][c] === 1) {
        const boardR = startRow + r;
        const boardC = startCol + c;
        if (board[boardR][boardC] !== null) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Checks if a given piece can be placed anywhere on the board.
 */
export function canPieceFitAnywhere(board, matrix) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let r = 0; r <= BOARD_SIZE - numRows; r++) {
    for (let c = 0; c <= BOARD_SIZE - numCols; c++) {
      if (canPlacePiece(board, matrix, r, c)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Places a piece on the board and returns a new board state.
 */
export function placePieceOnBoard(board, piece, startRow, startCol) {
  const newBoard = board.map((row) => [...row]);
  const matrix = piece.matrix;
  const color = piece.color || piece.defaultColor;

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 1) {
        newBoard[startRow + r][startCol + c] = {
          color: color,
          placedAt: Date.now(),
          pieceId: piece.id
        };
      }
    }
  }

  return newBoard;
}

/**
 * Finds all completed rows and columns.
 */
export function findCompletedLines(board) {
  const fullRows = [];
  const fullCols = [];

  // Check rows
  for (let r = 0; r < BOARD_SIZE; r++) {
    let isRowFull = true;
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === null) {
        isRowFull = false;
        break;
      }
    }
    if (isRowFull) {
      fullRows.push(r);
    }
  }

  // Check columns
  for (let c = 0; c < BOARD_SIZE; c++) {
    let isColFull = true;
    for (let r = 0; r < BOARD_SIZE; r++) {
      if (board[r][c] === null) {
        isColFull = false;
        break;
      }
    }
    if (isColFull) {
      fullCols.push(c);
    }
  }

  return {
    rows: fullRows,
    cols: fullCols,
    totalLines: fullRows.length + fullCols.length
  };
}

/**
 * Clears specified rows and columns from the board, returning new board.
 */
export function clearLinesFromBoard(board, rowsToClear, colsToClear) {
  const newBoard = board.map((row) => [...row]);

  rowsToClear.forEach((r) => {
    for (let c = 0; c < BOARD_SIZE; c++) {
      newBoard[r][c] = null;
    }
  });

  colsToClear.forEach((c) => {
    for (let r = 0; r < BOARD_SIZE; r++) {
      newBoard[r][c] = null;
    }
  });

  return newBoard;
}

/**
 * Counts empty cells on the board.
 */
export function countEmptyCells(board) {
  let empty = 0;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === null) empty++;
    }
  }
  return empty;
}

/**
 * Checks if the game is over: returns true ONLY when there are active pieces in tray
 * and NONE of them can fit in any cell on the board.
 */
export function isGameOver(board, trayPieces) {
  // Filter active pieces that haven't been used yet
  const activePieces = trayPieces.filter((p) => p && !p.isUsed);

  if (activePieces.length === 0) {
    // If tray is empty, player will receive new pieces, so not game over
    return false;
  }

  // If AT LEAST ONE piece can fit, the game continues
  for (const piece of activePieces) {
    if (canPieceFitAnywhere(board, piece.matrix)) {
      return false;
    }
  }

  return true;
}

/**
 * Determines if a move qualifies as a "PERFECT MOVE":
 * Cleared 2 or more lines AND leaves the board with high open space (>= 70% empty).
 */
export function isPerfectMove(boardAfterClear, linesClearedCount) {
  if (linesClearedCount < 2) return false;
  const emptyCells = countEmptyCells(boardAfterClear);
  const totalCells = BOARD_SIZE * BOARD_SIZE;
  return emptyCells / totalCells >= 0.7;
}
