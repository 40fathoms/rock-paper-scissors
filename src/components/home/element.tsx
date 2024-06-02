import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext'
import { cn } from '@/utils/cn'
import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses'
import { useContext, useRef } from 'react'
import { useAnimationFrame, motion } from 'framer-motion'

const Element = () => {
  const { boxRef } = useContext(RockPaperScissorsContext)
  const direction = useRef(generateRandomCathetuses())
  const positionRef = useRef(null)

  useAnimationFrame(({ time, delta }) => {
    if (!positionRef.current || !positionRef.current?.style) return

    const y = (1 + Math.sin(time / 1000)) * 50
    positionRef.current.style.transform = `translateY(${y}px))`

    // https://www.framer.com/motion/use-transform/

    // if (boxRef.current) {
    //   const box = boxRef.current
    //   const width = box.offsetWidth
    //   const boundary = width - 24

    //   const newX = positionRef.current.x + (direction.current.dx || 0)
    //   const newY = positionRef.current.y + (direction.current.dy || 0)

    //   if (newX >= 0 && newX <= boundary && newY >= 0 && newY <= boundary) {
    //     positionRef.current = { ...positionRef.current, x: newX, y: newY }
    //   }

    //   if (
    //     (newX >= 0 && newX <= boundary && newY >= boundary) ||
    //     (newX >= boundary && newY <= 0)
    //   ) {
    //     direction.current.dy *= -1
    //     positionRef.current = {
    //       ...positionRef.current,
    //       y: newY + (direction.current.dy || 0),
    //     }
    //   }

    //   if (
    //     (newY >= 0 && newY <= boundary && newX >= boundary) ||
    //     (newY >= boundary && newX <= 0)
    //   ) {
    //     direction.current.dx *= -1
    //     positionRef.current = {
    //       ...positionRef.current,
    //       x: newX + (direction.current.dx || 0),
    //     }
    //   }
    // }
  })

  return (
    <motion.div
      ref={positionRef}
      className={cn(['absolute h-6 w-6 bg-white'])}
    />
  )
}

export { Element }
