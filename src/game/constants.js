export const BOARD_SIZE = 8;

export const NEON_COLORS = {
  CYAN: {
    id: 'cyan',
    name: 'Electric Cyan',
    hex: '#00E5FF',
    glow: 'rgba(0, 229, 255, 0.75)',
    border: '#5df1ff',
    core: '#e0fbff',
    dark: '#005b66'
  },
  BLUE: {
    id: 'blue',
    name: 'Electric Blue',
    hex: '#2979FF',
    glow: 'rgba(41, 121, 255, 0.75)',
    border: '#70a4ff',
    core: '#e8f0ff',
    dark: '#0d3278'
  },
  PURPLE: {
    id: 'purple',
    name: 'Neon Violet',
    hex: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.75)',
    border: '#c58eff',
    core: '#f6edff',
    dark: '#4f1a82'
  },
  MAGENTA: {
    id: 'magenta',
    name: 'Cyber Magenta',
    hex: '#FF2BD6',
    glow: 'rgba(255, 43, 214, 0.75)',
    border: '#ff75e4',
    core: '#ffedfc',
    dark: '#800867'
  },
  LIME: {
    id: 'lime',
    name: 'Radioactive Lime',
    hex: '#39FF14',
    glow: 'rgba(57, 255, 20, 0.75)',
    border: '#83ff6d',
    core: '#f0ffec',
    dark: '#146603'
  },
  ORANGE: {
    id: 'orange',
    name: 'Solar Orange',
    hex: '#FF9100',
    glow: 'rgba(255, 145, 0, 0.75)',
    border: '#ffb95e',
    core: '#fff5e6',
    dark: '#734100'
  }
};

export const COLOR_KEYS = Object.keys(NEON_COLORS);

export const SCORING = {
  PER_BLOCK: 1,
  LINES: {
    1: 10,
    2: 25,
    3: 45,
    4: 70,
    5: 105,
    6: 145,
    7: 190,
    8: 240
  },
  PERFECT_MOVE_BONUS: 50
};

export const GAME_STATES = {
  HOME: 'HOME',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME_OVER'
};

export const STORAGE_KEYS = {
  BEST_SCORE: 'neon_blocks_best_score',
  SOUND_ENABLED: 'neon_blocks_sound_enabled',
  HAPTICS_ENABLED: 'neon_blocks_haptics_enabled',
  REDUCE_MOTION: 'neon_blocks_reduce_motion'
};
