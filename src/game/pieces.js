import { NEON_COLORS } from './constants';

export const SHAPES = [
  // 1x1 Single
  {
    id: 'dot_1',
    name: 'Single Unit',
    matrix: [[1]],
    defaultColor: NEON_COLORS.CYAN,
    tier: 'basic'
  },

  // 2-blocks
  {
    id: 'line_2_h',
    name: 'Duo Horizontal',
    matrix: [[1, 1]],
    defaultColor: NEON_COLORS.CYAN,
    tier: 'basic'
  },
  {
    id: 'line_2_v',
    name: 'Duo Vertical',
    matrix: [[1], [1]],
    defaultColor: NEON_COLORS.CYAN,
    tier: 'basic'
  },

  // 3-blocks
  {
    id: 'line_3_h',
    name: 'Trio Horizontal',
    matrix: [[1, 1, 1]],
    defaultColor: NEON_COLORS.BLUE,
    tier: 'basic'
  },
  {
    id: 'line_3_v',
    name: 'Trio Vertical',
    matrix: [[1], [1], [1]],
    defaultColor: NEON_COLORS.BLUE,
    tier: 'basic'
  },

  // 4-blocks line
  {
    id: 'line_4_h',
    name: 'Beam Horizontal',
    matrix: [[1, 1, 1, 1]],
    defaultColor: NEON_COLORS.PURPLE,
    tier: 'standard'
  },
  {
    id: 'line_4_v',
    name: 'Beam Vertical',
    matrix: [[1], [1], [1], [1]],
    defaultColor: NEON_COLORS.PURPLE,
    tier: 'standard'
  },

  // 5-blocks line
  {
    id: 'line_5_h',
    name: 'Mega Beam H',
    matrix: [[1, 1, 1, 1, 1]],
    defaultColor: NEON_COLORS.MAGENTA,
    tier: 'hard'
  },
  {
    id: 'line_5_v',
    name: 'Mega Beam V',
    matrix: [[1], [1], [1], [1], [1]],
    defaultColor: NEON_COLORS.MAGENTA,
    tier: 'hard'
  },

  // Squares
  {
    id: 'square_2x2',
    name: 'Core 2x2',
    matrix: [
      [1, 1],
      [1, 1]
    ],
    defaultColor: NEON_COLORS.LIME,
    tier: 'standard'
  },
  {
    id: 'square_3x3',
    name: 'Hyper Core 3x3',
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'hard'
  },

  // Mini L (2x2 with 3 blocks)
  {
    id: 'mini_corner_1',
    name: 'Corner Top-Left',
    matrix: [
      [1, 1],
      [1, 0]
    ],
    defaultColor: NEON_COLORS.BLUE,
    tier: 'basic'
  },
  {
    id: 'mini_corner_2',
    name: 'Corner Top-Right',
    matrix: [
      [1, 1],
      [0, 1]
    ],
    defaultColor: NEON_COLORS.BLUE,
    tier: 'basic'
  },
  {
    id: 'mini_corner_3',
    name: 'Corner Bottom-Left',
    matrix: [
      [1, 0],
      [1, 1]
    ],
    defaultColor: NEON_COLORS.BLUE,
    tier: 'basic'
  },
  {
    id: 'mini_corner_4',
    name: 'Corner Bottom-Right',
    matrix: [
      [0, 1],
      [1, 1]
    ],
    defaultColor: NEON_COLORS.BLUE,
    tier: 'basic'
  },

  // Standard L-Shapes (3x2 or 2x3, 4 blocks)
  {
    id: 'l_shape_1',
    name: 'L-Shape Alpha',
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },
  {
    id: 'l_shape_2',
    name: 'L-Shape Beta',
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },
  {
    id: 'l_shape_3',
    name: 'L-Shape Gamma',
    matrix: [
      [1, 1, 1],
      [1, 0, 0]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },
  {
    id: 'l_shape_4',
    name: 'L-Shape Delta',
    matrix: [
      [1, 1, 1],
      [0, 0, 1]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },
  {
    id: 'l_shape_5',
    name: 'L-Shape Epsilon',
    matrix: [
      [1, 1],
      [1, 0],
      [1, 0]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },
  {
    id: 'l_shape_6',
    name: 'L-Shape Zeta',
    matrix: [
      [1, 1],
      [0, 1],
      [0, 1]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },
  {
    id: 'l_shape_7',
    name: 'L-Shape Eta',
    matrix: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },
  {
    id: 'l_shape_8',
    name: 'L-Shape Theta',
    matrix: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    defaultColor: NEON_COLORS.ORANGE,
    tier: 'standard'
  },

  // 3x3 Large L (5 blocks)
  {
    id: 'large_l_1',
    name: 'Corner Rig 1',
    matrix: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1]
    ],
    defaultColor: NEON_COLORS.MAGENTA,
    tier: 'hard'
  },
  {
    id: 'large_l_2',
    name: 'Corner Rig 2',
    matrix: [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    defaultColor: NEON_COLORS.MAGENTA,
    tier: 'hard'
  },
  {
    id: 'large_l_3',
    name: 'Corner Rig 3',
    matrix: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0]
    ],
    defaultColor: NEON_COLORS.MAGENTA,
    tier: 'hard'
  },
  {
    id: 'large_l_4',
    name: 'Corner Rig 4',
    matrix: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1]
    ],
    defaultColor: NEON_COLORS.MAGENTA,
    tier: 'hard'
  },

  // T-Shapes
  {
    id: 't_shape_1',
    name: 'T-Beam Up',
    matrix: [
      [1, 1, 1],
      [0, 1, 0]
    ],
    defaultColor: NEON_COLORS.CYAN,
    tier: 'standard'
  },
  {
    id: 't_shape_2',
    name: 'T-Beam Down',
    matrix: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    defaultColor: NEON_COLORS.CYAN,
    tier: 'standard'
  },
  {
    id: 't_shape_3',
    name: 'T-Beam Left',
    matrix: [
      [1, 0],
      [1, 1],
      [1, 0]
    ],
    defaultColor: NEON_COLORS.CYAN,
    tier: 'standard'
  },
  {
    id: 't_shape_4',
    name: 'T-Beam Right',
    matrix: [
      [0, 1],
      [1, 1],
      [0, 1]
    ],
    defaultColor: NEON_COLORS.CYAN,
    tier: 'standard'
  },

  // Z / S Shapes
  {
    id: 'z_shape_h',
    name: 'Z-Wave Horizontal',
    matrix: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    defaultColor: NEON_COLORS.LIME,
    tier: 'standard'
  },
  {
    id: 's_shape_h',
    name: 'S-Wave Horizontal',
    matrix: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    defaultColor: NEON_COLORS.LIME,
    tier: 'standard'
  },
  {
    id: 'z_shape_v',
    name: 'Z-Wave Vertical',
    matrix: [
      [0, 1],
      [1, 1],
      [1, 0]
    ],
    defaultColor: NEON_COLORS.LIME,
    tier: 'standard'
  },
  {
    id: 's_shape_v',
    name: 'S-Wave Vertical',
    matrix: [
      [1, 0],
      [1, 1],
      [0, 1]
    ],
    defaultColor: NEON_COLORS.LIME,
    tier: 'standard'
  },

  // Cross / Plus
  {
    id: 'cross_5',
    name: 'Nexus Plus',
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    defaultColor: NEON_COLORS.PURPLE,
    tier: 'hard'
  }
];

export function countBlocksInMatrix(matrix) {
  let count = 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === 1) count++;
    }
  }
  return count;
}
