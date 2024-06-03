import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext'
import { cn } from '@/utils/cn'
import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses'
import { useContext, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame'

const Element = () => {
  const { boxRef } = useContext(RockPaperScissorsContext)
  const direction = useRef(generateRandomCathetuses())
  const positionRef = useRef(null)

  const x = useMotionValue(Math.random() * 240)
  const y = useMotionValue(Math.random() * 240)

  useRequestAnimationFrame(() => {
    if (boxRef.current) {
      const box = boxRef.current
      const width = box.offsetWidth
      const boundary = width - 24 // subtracting the width of the element

      const newX = x.get() + (direction.current.dx || 0)

      if (newX >= 0 && newX <= boundary) {
        x.set(newX)
      } else {
        direction.current.dx *= -1
        x.set(newX + (direction.current.dx || 0))
      }
    }
  })

  useRequestAnimationFrame(() => {
    if (boxRef.current) {
      const box = boxRef.current
      const width = box.offsetWidth
      const boundary = width - 24 // subtracting the width of the element

      const newY = y.get() + (direction.current.dy || 0)

      if (newY >= 0 && newY <= boundary) {
        y.set(newY)
      } else {
        direction.current.dy *= -1
        y.set(newY + (direction.current.dy || 0))
      }
    }
  })

  return (
    <motion.div
      ref={positionRef}
      style={{ x, y }}
      className={cn(['absolute h-6 w-6 bg-white'])}
    />
  )
}

export { Element }
