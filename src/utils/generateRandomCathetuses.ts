/**
 * Generates cathetuses x and y coordinates based on a random angle, such as their hypotenuse is always 1.
 *
 * @return {{x: number, y: number}} An object containing the random x and y coordinates.
 */
const generateRandomCathetuses = (): { dx: number; dy: number } => {
  const theta = Math.random() * 2 * Math.PI

  const dx = Math.cos(theta)
  const dy = Math.sin(theta)

  return { dx, dy }
}

export { generateRandomCathetuses }
