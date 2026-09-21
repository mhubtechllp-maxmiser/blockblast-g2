import React from 'react';
import { Volume2, VolumeX, Pause } from 'lucide-react';

export default function ScoreHUD({ score, bestScore, isMuted, onToggleMute, onPause }) {
  return (
    <div className="game-hud-top">
      <div className="score-cards-container">
        <div className="score-card">
          <span className="card-label">SCORE</span>
          <span className="card-value highlight-cyan">{score.toLocaleString()}</span>
        </div>
        <div className="score-card">
          <span className="card-label">BEST</span>
          <span className="card-value highlight-amber">{bestScore.toLocaleString()}</span>
        </div>
      </div>

      <div className="hud-actions">
        <button
          className="icon-btn"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button
          className="icon-btn"
          onClick={onPause}
          aria-label="Pause game"
        >
          <Pause size={20} />
        </button>
      </div>
    </div>
  );
}
