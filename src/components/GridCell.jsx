import React from 'react';

export default function GridCell({ cellData, isClearing, isGhost, ghostValid }) {
  if (isGhost) {
    return (
      <div className="board-cell">
        <div className={`ghost-cell ${ghostValid ? 'valid' : 'invalid'}`} />
      </div>
    );
  }

  if (!cellData) {
    return <div className="board-cell empty" />;
  }

  const colorId = cellData.color?.id || 'cyan';

  return (
    <div className="board-cell">
      <div className={`neon-block color-${colorId} ${isClearing ? 'clearing' : ''}`}>
        <div className="block-surface">
          <div className="energy-core" />
        </div>
      </div>
    </div>
  );
}
