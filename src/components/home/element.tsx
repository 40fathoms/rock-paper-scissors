import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext'
import { cn } from '@/utils/cn'
import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses'
import { useContext, useEffect, useState } from 'react'

const Element = () => {
  const { boxRef } = useContext(RockPaperScissorsContext)

  const [iconPosition, setIconPosition] = useState({ x: 250, y: 250 })
  const [direction, setDirection] = useState(generateRandomCathetuses())

  useEffect(() => {
    const animateIcon = () => {
      if (boxRef.current) {
        // Measure the box dimensions once it's mounted
        const box = boxRef.current
        const width = box?.offsetWidth
        // Assuming the box is square, we use either dimension for both boundaries
        const boundary = width - 24 // Subtract 24 from the icon dimensions

        const newX = iconPosition.x + direction.dx
        const newY = iconPosition.y + direction.dy

        console.log(`New X: ${newX}, New Y: ${newY}`) // Debugging log

        // Check if the new position is within the box
        if (newX >= 0 && newX <= boundary && newY >= 0 && newY <= boundary) {
          setIconPosition({ x: newX, y: newY })
        }

        // Change direction if hit the vertical boundary
        if (newX >= 0 && newX <= boundary && (newY >= boundary || newY <= 0)) {
          const newYDirection = direction.dy * -1

          setDirection((previousDirection) => ({
            ...previousDirection,
            dy: newYDirection,
          }))

          setIconPosition({ x: newX, y: iconPosition.y + newYDirection })
        }

        // Change direction if hit the horizontal boundary
        if (newY >= 0 && newY <= boundary && (newX >= boundary || newX <= 0)) {
          const newXDirection = direction.dx * -1

          setDirection((previousDirection) => ({
            ...previousDirection,
            dx: newXDirection,
          }))

          setIconPosition({ x: iconPosition.x + newXDirection, y: newY })
        }
      }
    }

    // Start animation loop
    const intervalId = setInterval(animateIcon, 5) // Adjust interval for speed

    return () => clearInterval(intervalId) 
  }, [iconPosition, direction])

  return (
    <div
      className={cn(['absolute h-6 w-6 bg-white'])}
      style={{
        left: `${iconPosition.x}px`,
        top: `${iconPosition.y}px`,
      }}
    />
  )
}

export { Element }
