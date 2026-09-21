import React from 'react';
import { RotateCcw, Home, Trophy } from 'lucide-react';

export default function GameOverModal({ stats, isNewHighScore, onRetry, onHome }) {
  const { score = 0, bestScore = 0, linesCleared = 0, maxCombo = 0, blocksPlaced = 0 } = stats || {};

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title neon-red">GAME OVER</h2>

        {isNewHighScore && (
          <div className="new-high-score-banner">
            ★ NEW HIGH SCORE ★
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-item full-width">
            <span className="stat-label">FINAL SCORE</span>
            <span className="stat-value highlight">{score.toLocaleString()}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">BEST</span>
            <span className="stat-value gold">{bestScore.toLocaleString()}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">LINES</span>
            <span className="stat-value">{linesCleared}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">MAX COMBO</span>
            <span className="stat-value">{maxCombo > 1 ? `x${maxCombo}` : '—'}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">BLOCKS</span>
            <span className="stat-value">{blocksPlaced}</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-modal-primary" onClick={onRetry}>
            <RotateCcw size={18} />
            RETRY
          </button>
          <button className="btn-modal-secondary" onClick={onHome}>
            <Home size={16} />
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}
