import React from 'react';
import { Play, HelpCircle, Settings, Trophy } from 'lucide-react';

export default function HomeScreen({ bestScore, onPlay, onHowToPlay, onSettings }) {
  return (
    <div className="home-screen">
      <div className="home-header">
        <h1 className="game-logo">
          <span className="logo-neon">NEON</span>
          <span className="logo-blocks">BLOCKS</span>
        </h1>
        <p className="game-subtitle">FUTURE GRID PUZZLE</p>
      </div>

      {/* 3D Animated Holographic Cube Centerpiece */}
      <div className="holo-cube-stage">
        <div className="holo-ring" />
        <div className="holo-cube-wrapper">
          <div className="cube-face front">
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
          </div>
          <div className="cube-face back">
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
          </div>
          <div className="cube-face right">
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
          </div>
          <div className="cube-face left">
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
          </div>
          <div className="cube-face top">
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
          </div>
          <div className="cube-face bottom">
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
            <div className="mini-cell" />
          </div>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="home-menu-actions">
        {bestScore > 0 && (
          <div className="best-score-badge">
            <Trophy size={15} color="#ffd600" />
            <span className="badge-label">RECORD:</span>
            <span className="badge-value">{bestScore.toLocaleString()}</span>
          </div>
        )}

        <button className="btn-play" onClick={onPlay} id="btn-home-play">
          <Play size={22} fill="currentColor" />
          START GAME
        </button>

        <div className="secondary-buttons">
          <button className="btn-secondary" onClick={onHowToPlay} id="btn-home-guide">
            <HelpCircle size={18} />
            GUIDE
          </button>
          <button className="btn-secondary" onClick={onSettings} id="btn-home-settings">
            <Settings size={18} />
            SETTINGS
          </button>
        </div>
      </div>

      <div className="home-footer-version">
        NEON CORE • MOBILE EDITION
      </div>
    </div>
  );
}
