import { STORAGE_KEYS } from './constants';

class HapticsEngine {
  constructor() {
    this.isEnabled = this.loadHapticsState();
  }

  loadHapticsState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HAPTICS_ENABLED);
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  }

  saveHapticsState(enabled) {
    try {
      localStorage.setItem(STORAGE_KEYS.HAPTICS_ENABLED, String(enabled));
    } catch {
      // Storage unavailable
    }
  }

  toggleHaptics() {
    this.isEnabled = !this.isEnabled;
    this.saveHapticsState(this.isEnabled);
    return this.isEnabled;
  }

  setHaptics(enabled) {
    this.isEnabled = enabled;
    this.saveHapticsState(this.isEnabled);
  }

  getIsEnabled() {
    return this.isEnabled;
  }

  trigger(type = 'light') {
    if (!this.isEnabled) return;
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;

    try {
      switch (type) {
        case 'pickup':
        case 'light':
          navigator.vibrate(14);
          break;
        case 'place':
        case 'drop':
          navigator.vibrate(28);
          break;
        case 'invalid':
          navigator.vibrate([20, 30, 20]);
          break;
        case 'clear':
        case 'medium':
          navigator.vibrate([40, 25, 45]);
          break;
        case 'combo':
        case 'heavy':
          navigator.vibrate([50, 30, 70, 40, 80]);
          break;
        case 'gameover':
          navigator.vibrate([100, 50, 120, 60, 200]);
          break;
        default:
          navigator.vibrate(18);
          break;
      }
    } catch {
      // Fallback
    }
  }
}

export const hapticsEngine = new HapticsEngine();
