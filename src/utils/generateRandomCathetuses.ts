type CathetusesDirection = { dx: number; dy: number };

/**
 * Generates cathetuses x and y based on a random angle, such as their hypotenuse is always 1.
 *
 * @param {number} hypotenuse - The length of the hypotenuse of the right triangle. Defaults to 1.
 * @return {CathetusesDirection} An object containing the random cathetuses.
 */
const generateRandomCathetuses = (hypotenuse = 1): CathetusesDirection => {
  const theta = Math.random() * 2 * Math.PI;

  const dx = Math.cos(theta) * hypotenuse;
  const dy = Math.sin(theta) * hypotenuse;

  return { dx, dy };
};

export { generateRandomCathetuses };
export type { CathetusesDirection };
