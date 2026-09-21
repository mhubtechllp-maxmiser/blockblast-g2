import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import GridCell from './GridCell';
import ParticleCanvas from './ParticleCanvas';
import { BOARD_SIZE } from '../game/constants';

const GameBoard = forwardRef(
  ({ board, ghostPreview, clearingCells, isShaking }, ref) => {
    const boardElRef = useRef(null);
    const particleCanvasRef = useRef(null);

    useImperativeHandle(ref, () => ({
      getBoardBoundingRect() {
        if (!boardElRef.current) return null;
        return boardElRef.current.getBoundingClientRect();
      },
      triggerClearParticles(rows, cols) {
        if (!boardElRef.current || !particleCanvasRef.current) return;
        const rect = boardElRef.current.getBoundingClientRect();
        // Inner padding is 8px
        const availableWidth = rect.width - 16;
        const cellSize = availableWidth / BOARD_SIZE;
        particleCanvasRef.current.spawnLineParticles(rows, cols, rect, cellSize);
      }
    }));

    return (
      <div className="board-wrapper">
        <div
          ref={boardElRef}
          className={`game-board ${isShaking ? 'screen-shake' : ''}`}
        >
          <ParticleCanvas ref={particleCanvasRef} />

          {board.map((rowArr, r) =>
            rowArr.map((cellData, c) => {
              const cellKey = `${r}-${c}`;
              const isClearing = clearingCells && clearingCells.has(cellKey);

              // Check if cell is covered by ghost preview
              let isGhost = false;
              let ghostValid = false;

              if (ghostPreview && ghostPreview.cells) {
                const match = ghostPreview.cells.find((cell) => cell.r === r && cell.c === c);
                if (match) {
                  isGhost = true;
                  ghostValid = ghostPreview.isValid;
                }
              }

              return (
                <GridCell
                  key={cellKey}
                  cellData={cellData}
                  isClearing={isClearing}
                  isGhost={isGhost}
                  ghostValid={ghostValid}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
);

export default GameBoard;
