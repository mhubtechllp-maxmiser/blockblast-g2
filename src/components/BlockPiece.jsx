import React from 'react';

export default function BlockPiece({ piece, cellSize = 30, style = {} }) {
  if (!piece || !piece.matrix) return null;

  const matrix = piece.matrix;
  const rows = matrix.length;
  const cols = matrix[0].length;
  const colorId = piece.color?.id || 'cyan';

  return (
    <div
      className="piece-preview-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        ...style
      }}
    >
      {matrix.map((rowArr, r) =>
        rowArr.map((val, c) => {
          if (val === 1) {
            return (
              <div
                key={`${r}-${c}`}
                className={`neon-block color-${colorId}`}
                style={{ width: cellSize, height: cellSize }}
              >
                <div className="block-surface">
                  <div className="energy-core" />
                </div>
              </div>
            );
          }
          return <div key={`${r}-${c}`} style={{ width: cellSize, height: cellSize }} />;
        })
      )}
    </div>
  );
}
