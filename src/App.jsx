import React, { useState, useEffect, useCallback } from 'react';
import MobileContainer from './components/MobileContainer';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import PauseModal from './components/PauseModal';
import GameOverModal from './components/GameOverModal';
import SettingsModal from './components/SettingsModal';
import HowToPlayModal from './components/HowToPlayModal';

import { GAME_STATES, STORAGE_KEYS } from './game/constants';
import { soundEngine } from './game/soundEngine';
import { hapticsEngine } from './game/haptics';

import './styles/main.scss';

export default function App() {
  const [gameState, setGameState] = useState(GAME_STATES.HOME);
  const [bestScore, setBestScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Modals
  const [showSettings, setShowSettings] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // End game stats
  const [lastGameStats, setLastGameStats] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  // Game session instance key to force fresh reset on restart
  const [gameSessionKey, setGameSessionKey] = useState(1);

  // Load saved preferences on startup
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem(STORAGE_KEYS.BEST_SCORE);
      if (savedScore) setBestScore(parseInt(savedScore, 10) || 0);

      const savedMotion = localStorage.getItem(STORAGE_KEYS.REDUCE_MOTION);
      if (savedMotion) setReduceMotion(savedMotion === 'true');

      setSoundEnabled(!soundEngine.getIsMuted());
      setHapticsEnabled(hapticsEngine.getIsEnabled());
    } catch {
      // Storage unavailable
    }
  }, []);

  // Update best score
  const handleUpdateBestScore = useCallback((score) => {
    setBestScore((prev) => {
      if (score > prev) {
        try {
          localStorage.setItem(STORAGE_KEYS.BEST_SCORE, String(score));
        } catch {
          // Storage fallback
        }
        return score;
      }
      return prev;
    });
  }, []);

  // Reset Best Score
  const handleResetBestScore = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BEST_SCORE);
    } catch {
      // Fallback
    }
    setBestScore(0);
    soundEngine.playClick();
  }, []);

  // Navigation handlers
  const handleStartGame = () => {
    soundEngine.playClick();
    hapticsEngine.trigger('light');
    setGameSessionKey((k) => k + 1);
    setGameState(GAME_STATES.PLAYING);
  };

  const handlePause = () => {
    soundEngine.playClick();
    setGameState(GAME_STATES.PAUSED);
  };

  const handleResume = () => {
    soundEngine.playClick();
    setGameState(GAME_STATES.PLAYING);
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setGameSessionKey((k) => k + 1);
    setGameState(GAME_STATES.PLAYING);
  };

  const handleHome = () => {
    soundEngine.playClick();
    setGameState(GAME_STATES.HOME);
  };

  const handleGameOver = (stats) => {
    const isNewHigh = stats.score > bestScore && stats.score > 0;
    setIsNewHighScore(isNewHigh);
    if (isNewHigh) {
      soundEngine.playHighScore();
      handleUpdateBestScore(stats.score);
    }
    setLastGameStats(stats);
    setGameState(GAME_STATES.GAME_OVER);
  };

  // Setting toggles
  const handleToggleSound = () => {
    const nextState = soundEngine.toggleMute();
    setSoundEnabled(nextState);
    if (nextState) soundEngine.playClick();
  };

  const handleToggleHaptics = () => {
    const nextState = hapticsEngine.toggleHaptics();
    setHapticsEnabled(nextState);
    if (nextState) hapticsEngine.trigger('light');
  };

  const handleToggleMotion = () => {
    setReduceMotion((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEYS.REDUCE_MOTION, String(next));
      } catch {
        // Fallback
      }
      return next;
    });
    soundEngine.playClick();
  };

  return (
    <MobileContainer>
      {gameState === GAME_STATES.HOME && (
        <HomeScreen
          bestScore={bestScore}
          onPlay={handleStartGame}
          onHowToPlay={() => {
            soundEngine.playClick();
            setShowHowToPlay(true);
          }}
          onSettings={() => {
            soundEngine.playClick();
            setShowSettings(true);
          }}
        />
      )}

      {(gameState === GAME_STATES.PLAYING ||
        gameState === GAME_STATES.PAUSED ||
        gameState === GAME_STATES.GAME_OVER) && (
        <GameScreen
          key={gameSessionKey}
          bestScore={bestScore}
          onUpdateBestScore={handleUpdateBestScore}
          onGameOver={handleGameOver}
          onPause={handlePause}
          reduceMotion={reduceMotion}
        />
      )}

      {gameState === GAME_STATES.PAUSED && (
        <PauseModal
          onResume={handleResume}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}

      {gameState === GAME_STATES.GAME_OVER && (
        <GameOverModal
          stats={lastGameStats}
          isNewHighScore={isNewHighScore}
          onRetry={handleRestart}
          onHome={handleHome}
        />
      )}

      {showSettings && (
        <SettingsModal
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          hapticsEnabled={hapticsEnabled}
          onToggleHaptics={handleToggleHaptics}
          reduceMotion={reduceMotion}
          onToggleMotion={handleToggleMotion}
          onResetScore={handleResetBestScore}
          onClose={() => {
            soundEngine.playClick();
            setShowSettings(false);
          }}
        />
      )}

      {showHowToPlay && (
        <HowToPlayModal
          onClose={() => {
            soundEngine.playClick();
            setShowHowToPlay(false);
          }}
        />
      )}
    </MobileContainer>
  );
}
