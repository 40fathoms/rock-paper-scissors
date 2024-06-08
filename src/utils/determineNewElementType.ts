import type { ElementTypes } from '@/classes/quadTree';

interface IDetermineNewElementType {
  (currentType: ElementTypes, intersectingType: ElementTypes): ElementTypes;
}

/**
 * Determines the new element type based on the current type and the intersecting type.
 *
 * @param {ElementTypes} currentType - the current element type.
 * @param {ElementTypes} intersectingType - the intersecting element type.
 * @returns {ElementTypes} the new element type.
 */
const determineNewElementType: IDetermineNewElementType = (
  currentType,
  intersectingType
) => {
  if (currentType === 'rock' && intersectingType === 'scissors') {
    return 'rock';
  } else if (currentType === 'rock' && intersectingType === 'paper') {
    return 'paper';
  } else if (currentType === 'scissors' && intersectingType === 'paper') {
    return 'scissors';
  } else if (currentType === 'scissors' && intersectingType === 'rock') {
    return 'rock';
  } else if (currentType === 'paper' && intersectingType === 'rock') {
    return 'paper';
  } else if (currentType === 'rock' && intersectingType === 'rock') {
    return 'rock';
  }
  return currentType;
};

export { determineNewElementType };
