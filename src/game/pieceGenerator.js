import { SHAPES } from './pieces';
import { NEON_COLORS, COLOR_KEYS, BOARD_SIZE } from './constants';
import { canPieceFitAnywhere, countEmptyCells } from './boardLogic';

/**
 * Returns a random item from an array.
 */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns a random distinct neon color.
 */
function getRandomNeonColor(excludeColors = []) {
  const availableKeys = COLOR_KEYS.filter((key) => !excludeColors.includes(NEON_COLORS[key].hex));
  const chosenKey = availableKeys.length > 0 ? getRandomItem(availableKeys) : getRandomItem(COLOR_KEYS);
  return NEON_COLORS[chosenKey];
}

/**
 * Generates a batch of 3 pieces intelligently based on current board state.
 */
export function generatePieceBatch(board) {
  const emptyCells = countEmptyCells(board);
  const totalCells = BOARD_SIZE * BOARD_SIZE;
  const emptyRatio = emptyCells / totalCells;

  // Categorize shapes by tier
  const basicShapes = SHAPES.filter((s) => s.tier === 'basic');
  const standardShapes = SHAPES.filter((s) => s.tier === 'standard');
  const hardShapes = SHAPES.filter((s) => s.tier === 'hard');

  // Filter shapes that can legally fit right now
  const fittableShapes = SHAPES.filter((s) => canPieceFitAnywhere(board, s.matrix));

  const chosenPieces = [];
  const chosenShapeIds = new Set();
  const chosenColors = [];

  // Determine difficulty profile based on board state
  let maxHardAllowed = 1;
  let forceBasicCount = 0;

  if (emptyRatio < 0.35) {
    // Board is very tight: give survival pieces
    forceBasicCount = 2;
    maxHardAllowed = 0;
  } else if (emptyRatio < 0.55) {
    // Moderate congestion
    forceBasicCount = 1;
    maxHardAllowed = 1;
  } else {
    // High open space: regular distribution
    maxHardAllowed = 1;
  }

  let hardCount = 0;

  for (let slot = 0; slot < 3; slot++) {
    let candidatePool = [];

    // Slot 0 guarantee: MUST be fittable so the player never gets an instant unavoidable game-over on batch roll
    if (slot === 0 && fittableShapes.length > 0) {
      // Pick from fittable shapes
      const fittableFiltered = fittableShapes.filter((s) => {
        if (s.tier === 'hard' && hardCount >= maxHardAllowed) return false;
        return true;
      });
      candidatePool = fittableFiltered.length > 0 ? fittableFiltered : fittableShapes;
    } else if (slot < forceBasicCount) {
      // Pick from basic shapes
      candidatePool = basicShapes;
    } else {
      // General selection
      if (hardCount < maxHardAllowed && Math.random() < 0.25) {
        candidatePool = hardShapes;
      } else if (Math.random() < 0.65) {
        candidatePool = standardShapes;
      } else {
        candidatePool = basicShapes;
      }
    }

    // Filter out already chosen shape IDs in this batch to avoid duplicates
    let uniqueCandidates = candidatePool.filter((s) => !chosenShapeIds.has(s.id));
    if (uniqueCandidates.length === 0) {
      uniqueCandidates = candidatePool;
    }

    // Pick shape
    const baseShape = getRandomItem(uniqueCandidates) || SHAPES[0];
    chosenShapeIds.add(baseShape.id);

    if (baseShape.tier === 'hard') {
      hardCount++;
    }

    // Pick vibrant color distinct from others in the tray if possible
    const color = getRandomNeonColor(chosenColors);
    chosenColors.push(color.hex);

    chosenPieces.push({
      ...baseShape,
      instanceId: `piece_${Date.now()}_${slot}_${Math.random().toString(36).substring(2, 7)}`,
      color: color,
      isUsed: false
    });
  }

  // Final sanity check: if none of the 3 pieces can fit, and there are fittable shapes in the game,
  // replace the last piece with a guaranteed fittable shape!
  const anyCanFit = chosenPieces.some((p) => canPieceFitAnywhere(board, p.matrix));
  if (!anyCanFit && fittableShapes.length > 0) {
    const safeShape = getRandomItem(fittableShapes);
    const safeColor = getRandomNeonColor();
    chosenPieces[2] = {
      ...safeShape,
      instanceId: `piece_safe_${Date.now()}`,
      color: safeColor,
      isUsed: false
    };
  }

  return chosenPieces;
}
