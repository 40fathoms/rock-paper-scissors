import type { MutableRefObject, RefObject } from 'react'
import type { CathetusesDirection } from './generateRandomCathetuses'
import type { MotionValue } from 'framer-motion'

interface IUpdateElementPosition {
  (props: {
    boundaryElementRef: RefObject<HTMLDivElement>
    motionValue: MotionValue<number>
    axis: keyof CathetusesDirection
    direction: MutableRefObject<CathetusesDirection>
  }): void
}

/**
 * Updates the position of an element within a boundary.
 *
 * @param {Object} props - The properties for updating the element position.
 * @param {RefObject<HTMLDivElement>} props.boundaryElementRef - The reference to the boundary element.
 * @param {MotionValue<number>} props.motionValue - The motion value for the element's position.
 * @param {keyof CathetusesDirection} props.axis - The axis of movement.
 * @param {MutableRefObject<CathetusesDirection>} props.direction - The direction of movement.
 */
const updateElementPosition: IUpdateElementPosition = ({
  boundaryElementRef,
  motionValue,
  axis,
  direction,
}) => {
  if (!boundaryElementRef.current) return

  const box = boundaryElementRef.current
  const width = box.offsetWidth
  const boundary = width - 24 // Subtracting the width of the element

  const newPosition = motionValue.get() + (direction.current[axis] || 0)

  if (newPosition >= 0 && newPosition <= boundary) {
    motionValue.set(newPosition)
  } else {
    direction.current[axis] *= -1
    motionValue.set(newPosition + (direction.current[axis] || 0))
  }
}

export { updateElementPosition }
