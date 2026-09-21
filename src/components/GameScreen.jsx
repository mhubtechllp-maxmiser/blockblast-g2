import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameBoard from './GameBoard';
import PieceTray from './PieceTray';
import DragOverlay from './DragOverlay';
import ScoreHUD from './ScoreHUD';
import ComboNotification from './ComboNotification';
import BackgroundFX from './BackgroundFX';

import { BOARD_SIZE, SCORING, STORAGE_KEYS } from '../game/constants';
import { countBlocksInMatrix } from '../game/pieces';
import {
  createEmptyBoard,
  canPlacePiece,
  placePieceOnBoard,
  findCompletedLines,
  clearLinesFromBoard,
  isGameOver,
  isPerfectMove
} from '../game/boardLogic';
import { generatePieceBatch } from '../game/pieceGenerator';
import { soundEngine } from '../game/soundEngine';
import { hapticsEngine } from '../game/haptics';

const VERTICAL_TOUCH_OFFSET = 95; // Piece appears ~95px above finger so touch does not obscure target grid

export default function GameScreen({
  bestScore,
  onUpdateBestScore,
  onGameOver,
  onPause,
  reduceMotion
}) {
  const [board, setBoard] = useState(createEmptyBoard);
  const [trayPieces, setTrayPieces] = useState(() => generatePieceBatch(createEmptyBoard()));
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [linesClearedTotal, setLinesClearedTotal] = useState(0);
  const [blocksPlacedTotal, setBlocksPlacedTotal] = useState(0);
  const [isMuted, setIsMuted] = useState(() => soundEngine.getIsMuted());

  // Visual effects state
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [dragPos, setDragPos] = useState(null);
  const [ghostPreview, setGhostPreview] = useState(null);
  const [clearingCells, setClearingCells] = useState(new Set());
  const [isShaking, setIsShaking] = useState(false);
  const [comboData, setComboData] = useState(null);

  const boardRef = useRef(null);
  const isInteractingRef = useRef(false);

  // Sync best score to localStorage
  useEffect(() => {
    if (score > bestScore) {
      onUpdateBestScore(score);
    }
  }, [score, bestScore, onUpdateBestScore]);

  // Handle Mute Toggle
  const handleToggleMute = useCallback(() => {
    const newSoundState = soundEngine.toggleMute();
    setIsMuted(!newSoundState);
  }, []);

  // Calculate board grid coordinate under drag point
  const calculateGridCoords = useCallback(
    (clientX, clientY, piece) => {
      if (!boardRef.current || !piece) return null;
      const boardRect = boardRef.current.getBoardBoundingRect();
      if (!boardRect) return null;

      // Inner padding is 8px
      const boardPadding = 8;
      const boardAvailableWidth = boardRect.width - boardPadding * 2;
      const cellSize = boardAvailableWidth / BOARD_SIZE;

      // Center of piece in screen coordinates
      const pieceCenterX = clientX;
      const pieceCenterY = clientY - VERTICAL_TOUCH_OFFSET;

      // Width and height of piece
      const pieceCols = piece.matrix[0].length;
      const pieceRows = piece.matrix.length;
      const pieceWidth = pieceCols * cellSize;
      const pieceHeight = pieceRows * cellSize;

      // Top-left of piece relative to board cells
      const relX = pieceCenterX - pieceWidth / 2 - (boardRect.left + boardPadding);
      const relY = pieceCenterY - pieceHeight / 2 - (boardRect.top + boardPadding);

      const targetCol = Math.round(relX / cellSize);
      const targetRow = Math.round(relY / cellSize);

      return {
        row: targetRow,
        col: targetCol,
        cellSize
      };
    },
    []
  );

  // Pointer Down on Tray Piece
  const handlePiecePointerDown = useCallback(
    (piece, index, e) => {
      isInteractingRef.current = true;
      setDraggedPiece(piece);
      setDraggingIndex(index);
      setDragPos({ x: e.clientX, y: e.clientY - VERTICAL_TOUCH_OFFSET });

      soundEngine.playPickup();
      hapticsEngine.trigger('pickup');

      // Initial ghost check
      const coords = calculateGridCoords(e.clientX, e.clientY, piece);
      if (coords) {
        updateGhostPreview(coords.row, coords.col, piece, board);
      }
    },
    [board, calculateGridCoords]
  );

  // Update Ghost Preview
  const updateGhostPreview = useCallback(
    (row, col, piece, currentBoard) => {
      const matrix = piece.matrix;
      const numRows = matrix.length;
      const numCols = matrix[0].length;

      // Check if partially on board
      const isOverBoard =
        row + numRows > 0 &&
        row < BOARD_SIZE &&
        col + numCols > 0 &&
        col < BOARD_SIZE;

      if (!isOverBoard) {
        setGhostPreview(null);
        return;
      }

      const isValid = canPlacePiece(currentBoard, matrix, row, col);

      const ghostCells = [];
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          if (matrix[r][c] === 1) {
            const targetR = row + r;
            const targetC = col + c;
            if (
              targetR >= 0 &&
              targetR < BOARD_SIZE &&
              targetC >= 0 &&
              targetC < BOARD_SIZE
            ) {
              ghostCells.push({ r: targetR, c: targetC });
            }
          }
        }
      }

      setGhostPreview({
        isValid,
        cells: ghostCells,
        startR: row,
        startC: col
      });
    },
    []
  );

  // Global Pointer Move
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isInteractingRef.current || !draggedPiece) return;

      const clientX = e.clientX;
      const clientY = e.clientY;
      setDragPos({ x: clientX, y: clientY - VERTICAL_TOUCH_OFFSET });

      const coords = calculateGridCoords(clientX, clientY, draggedPiece);
      if (coords) {
        updateGhostPreview(coords.row, coords.col, draggedPiece, board);
      } else {
        setGhostPreview(null);
      }
    };

    const handlePointerUp = (e) => {
      if (!isInteractingRef.current || !draggedPiece) return;

      isInteractingRef.current = false;

      // Verify placement
      if (ghostPreview && ghostPreview.isValid) {
        // Place piece
        handlePlacePiece(draggedPiece, draggingIndex, ghostPreview.startR, ghostPreview.startC);
      } else {
        // Invalid or outside drop
        if (ghostPreview && !ghostPreview.isValid) {
          soundEngine.playInvalid();
          hapticsEngine.trigger('invalid');
        }
      }

      // Reset drag state
      setDraggedPiece(null);
      setDraggingIndex(-1);
      setDragPos(null);
      setGhostPreview(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggedPiece, draggingIndex, ghostPreview, board, calculateGridCoords, updateGhostPreview]);

  // Execute Piece Placement
  const handlePlacePiece = (piece, slotIndex, startR, startC) => {
    soundEngine.playDrop();
    hapticsEngine.trigger('place');

    // Update board with new piece
    const newBoard = placePieceOnBoard(board, piece, startR, startC);

    // Update tray slot
    const updatedTray = trayPieces.map((p, idx) =>
      idx === slotIndex ? { ...p, isUsed: true } : p
    );

    const blocksInPiece = countBlocksInMatrix(piece.matrix);
    const placementScore = blocksInPiece * SCORING.PER_BLOCK;

    setBlocksPlacedTotal((prev) => prev + blocksInPiece);

    // Check completed lines
    const { rows, cols, totalLines } = findCompletedLines(newBoard);

    if (totalLines > 0) {
      // Line Clear Occurred!
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setMaxCombo((prev) => Math.max(prev, nextCombo));
      setLinesClearedTotal((prev) => prev + totalLines);

      // Scoring calculation
      const baseLineScore = SCORING.LINES[totalLines] || 100 + totalLines * 35;
      const multiplier = Math.min(nextCombo, 10);
      const totalLinePoints = baseLineScore * multiplier;
      const earnedScore = placementScore + totalLinePoints;

      setScore((prev) => prev + earnedScore);

      // Trigger line animations
      const clearingSet = new Set();
      rows.forEach((r) => {
        for (let c = 0; c < BOARD_SIZE; c++) clearingSet.add(`${r}-${c}`);
      });
      cols.forEach((c) => {
        for (let r = 0; r < BOARD_SIZE; r++) clearingSet.add(`${r}-${c}`);
      });
      setClearingCells(clearingSet);

      if (!reduceMotion) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 320);
      }

      // Audio & Haptics
      soundEngine.playLineClear(totalLines);
      if (nextCombo > 1) {
        soundEngine.playCombo(nextCombo);
        hapticsEngine.trigger('combo');
      } else {
        hapticsEngine.trigger('clear');
      }

      // Particles
      if (boardRef.current) {
        boardRef.current.triggerClearParticles(rows, cols);
      }

      // Board after clear for metrics
      const boardAfterClear = clearLinesFromBoard(newBoard, rows, cols);

      // Perfect move evaluation
      const perfect = isPerfectMove(boardAfterClear, totalLines);
      if (perfect) {
        setScore((prev) => prev + SCORING.PERFECT_MOVE_BONUS);
        setComboData({
          title: 'PERFECT MOVE',
          bonusPoints: SCORING.PERFECT_MOVE_BONUS
        });
      } else if (nextCombo > 1) {
        let title = `COMBO x${nextCombo}`;
        if (totalLines === 2) title = `DOUBLE CLEAR • x${nextCombo}`;
        else if (totalLines === 3) title = `TRIPLE CLEAR • x${nextCombo}`;
        else if (totalLines >= 4) title = `ULTRA CLEAR • x${nextCombo}`;

        setComboData({
          title,
          bonusPoints: totalLinePoints
        });
      } else if (totalLines >= 2) {
        let title = 'DOUBLE CLEAR';
        if (totalLines === 3) title = 'TRIPLE CLEAR';
        else if (totalLines >= 4) title = 'ULTRA CLEAR';
        setComboData({
          title,
          bonusPoints: totalLinePoints
        });
      }

      // Clear cells after dissolve duration (~340ms)
      setTimeout(() => {
        setBoard(boardAfterClear);
        setClearingCells(new Set());
        postPlacementCheck(boardAfterClear, updatedTray);
      }, 340);
    } else {
      // No lines cleared: reset combo
      setCombo(0);
      setScore((prev) => prev + placementScore);
      setBoard(newBoard);
      postPlacementCheck(newBoard, updatedTray);
    }
  };

  // Check if tray is empty or if game over
  const postPlacementCheck = (currentBoard, currentTray) => {
    const allUsed = currentTray.every((p) => !p || p.isUsed);

    if (allUsed) {
      // Roll 3 new pieces
      const newPieces = generatePieceBatch(currentBoard);
      setTrayPieces(newPieces);

      // Check if new batch has any moves
      if (isGameOver(currentBoard, newPieces)) {
        triggerGameOver();
      }
    } else {
      setTrayPieces(currentTray);
      // Check if remaining pieces can fit
      if (isGameOver(currentBoard, currentTray)) {
        triggerGameOver();
      }
    }
  };

  // Trigger Game Over
  const triggerGameOver = () => {
    soundEngine.playGameOver();
    hapticsEngine.trigger('gameover');

    onGameOver({
      score,
      bestScore: Math.max(score, bestScore),
      linesCleared: linesClearedTotal,
      maxCombo,
      blocksPlaced: blocksPlacedTotal
    });
  };

  return (
    <div className="mobile-screen-content">
      <BackgroundFX />

      {/* Top HUD */}
      <ScoreHUD
        score={score}
        bestScore={bestScore}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onPause={onPause}
      />

      {/* 8x8 Futuristic Game Board */}
      <GameBoard
        ref={boardRef}
        board={board}
        ghostPreview={ghostPreview}
        clearingCells={clearingCells}
        isShaking={isShaking}
      />

      {/* Status Bar / Active Combo Indicator */}
      <div className={`status-indicator-bar ${combo > 1 ? 'active-streak' : ''}`}>
        {combo > 1 ? `STREAK ACTIVE • MULTIPLIER x${combo}` : 'DRAG BLOCKS TO GRID'}
      </div>

      {/* Piece Tray */}
      <PieceTray
        pieces={trayPieces}
        draggingIndex={draggingIndex}
        onPiecePointerDown={handlePiecePointerDown}
      />

      {/* Drag Overlay following finger with vertical offset */}
      {draggedPiece && (
        <DragOverlay
          draggedPiece={draggedPiece}
          position={dragPos}
          cellSize={32}
        />
      )}

      {/* Floating Combo Popup */}
      <ComboNotification comboData={comboData} />
    </div>
  );
}
