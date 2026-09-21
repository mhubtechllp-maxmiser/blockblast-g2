import React from 'react';
import { Play, RotateCcw, Home } from 'lucide-react';

export default function PauseModal({ onResume, onRestart, onHome }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title neon-cyan">PAUSED</h2>

        <div className="modal-actions">
          <button className="btn-modal-primary" onClick={onResume}>
            <Play size={18} />
            RESUME
          </button>
          <button className="btn-modal-secondary" onClick={onRestart}>
            <RotateCcw size={16} />
            RESTART
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
