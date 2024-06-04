import { motion, useMotionValue } from 'framer-motion';
import { useContext, useRef } from 'react';

import { Point } from '@/classes/quadTree';
import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { cn } from '@/utils/cn';
import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses';
import { updateElementPosition } from '@/utils/updateElementPosition';

interface ElementProps {
  id: string;
  initialX: number;
  initialY: number;
}

const Element = ({ id, initialX, initialY }: ElementProps) => {
  const { boxRef, updateQuadTree } = useContext(RockPaperScissorsContext);
  const direction = useRef(generateRandomCathetuses());
  const positionRef = useRef(null);

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const updatePositionInQuadTree = () => {
    const point = new Point(x.get(), y.get(), id);
    updateQuadTree(point, id);
  };

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: x,
      axis: 'dx',
      direction
    });
    updatePositionInQuadTree();
  });

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: y,
      axis: 'dy',
      direction
    });
    updatePositionInQuadTree();
  });

  return (
    <motion.div
      ref={positionRef}
      style={{ x, y }}
      className={cn(['absolute h-6 w-6 bg-white'])}
    />
  );
};

export { Element };
