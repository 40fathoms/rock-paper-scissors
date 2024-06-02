/**
 * Generates cathetuses x and y based on a random angle, such as their hypotenuse is always 1.
 *
 * @return {{dx: number, dy: number}} An object containing the random cathetuses.
 */
const generateRandomCathetuses = (): { dx: number; dy: number } => {
  const theta = Math.random() * 2 * Math.PI

  const dx = Math.cos(theta)
  const dy = Math.sin(theta)

  return { dx, dy }
}

export { generateRandomCathetuses }
