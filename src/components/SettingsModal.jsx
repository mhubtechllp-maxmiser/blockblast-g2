import React from 'react';
import { X, Volume2, Smartphone, Zap, Trash2 } from 'lucide-react';

export default function SettingsModal({
  soundEnabled,
  onToggleSound,
  hapticsEnabled,
  onToggleHaptics,
  reduceMotion,
  onToggleMotion,
  onResetScore,
  onClose
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title neon-cyan">SETTINGS</h2>

        <div className="settings-list">
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-title">Sound FX</span>
              <span className="setting-desc">Procedural synthesizer audio</span>
            </div>
            <div
              className={`toggle-switch ${soundEnabled ? 'on' : ''}`}
              onClick={onToggleSound}
              role="switch"
              aria-checked={soundEnabled}
            >
              <div className="toggle-thumb" />
            </div>
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-title">Haptic Feedback</span>
              <span className="setting-desc">Touch vibration pulses</span>
            </div>
            <div
              className={`toggle-switch ${hapticsEnabled ? 'on' : ''}`}
              onClick={onToggleHaptics}
              role="switch"
              aria-checked={hapticsEnabled}
            >
              <div className="toggle-thumb" />
            </div>
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-title">Reduce Motion</span>
              <span className="setting-desc">Minimize screen shakes</span>
            </div>
            <div
              className={`toggle-switch ${reduceMotion ? 'on' : ''}`}
              onClick={onToggleMotion}
              role="switch"
              aria-checked={reduceMotion}
            >
              <div className="toggle-thumb" />
            </div>
          </div>

          <button className="btn-reset-score" onClick={onResetScore}>
            <Trash2 size={14} style={{ display: 'inline', marginRight: 6 }} />
            RESET BEST SCORE
          </button>
        </div>

        <div className="modal-actions">
          <button className="btn-modal-primary" onClick={onClose}>
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
