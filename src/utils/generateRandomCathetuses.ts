type CathetusesDirection = { dx: number; dy: number };

interface IGenerateRandomCathetuses {
  (hypotenuse?: number): CathetusesDirection;
}

/**
 * Generates cathetuses x and y based on a random angle, such as their hypotenuse is always 1.
 *
 * @param {number} hypotenuse - The length of the hypotenuse of the right triangle. Defaults to 1.
 * @return {CathetusesDirection} An object containing the random cathetuses.
 */
const generateRandomCathetuses: IGenerateRandomCathetuses = (
  hypotenuse = 1
) => {
  const theta = Math.random() * 2 * Math.PI;

  const dx = Math.cos(theta) * hypotenuse;
  const dy = Math.sin(theta) * hypotenuse;

  return { dx, dy };
};

export { generateRandomCathetuses };
export type { CathetusesDirection };
