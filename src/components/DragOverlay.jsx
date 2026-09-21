import React from 'react';
import BlockPiece from './BlockPiece';

export default function DragOverlay({ draggedPiece, position, cellSize = 36 }) {
  if (!draggedPiece || !position) return null;

  return (
    <div
      className="dragged-piece-overlay"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <BlockPiece piece={draggedPiece} cellSize={cellSize} />
    </div>
  );
}
