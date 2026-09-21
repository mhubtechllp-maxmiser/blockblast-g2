import React from 'react';
import BlockPiece from './BlockPiece';

export default function PieceTray({ pieces, draggingIndex, onPiecePointerDown }) {
  return (
    <div className="piece-tray-container">
      {pieces.map((piece, index) => {
        const isDraggingThis = draggingIndex === index;
        const isEmpty = !piece || piece.isUsed;

        return (
          <div
            key={piece ? piece.instanceId : `empty-slot-${index}`}
            className={`piece-tray-slot ${isEmpty ? 'is-empty' : 'has-piece'}`}
            onPointerDown={(e) => {
              if (isEmpty) return;
              e.preventDefault();
              onPiecePointerDown(piece, index, e);
            }}
          >
            {!isEmpty && (
              <>
                <div
                  className="slot-glow"
                  style={{ background: piece.color ? piece.color.hex : '#00e5ff' }}
                />
                <div
                  style={{
                    opacity: isDraggingThis ? 0.25 : 1,
                    transform: isDraggingThis ? 'scale(0.85)' : 'scale(1)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <BlockPiece piece={piece} cellSize={24} />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
