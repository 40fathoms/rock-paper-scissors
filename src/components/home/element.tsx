import { motion, useMotionValue } from 'framer-motion';
import { useContext, useRef } from 'react';

import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { cn } from '@/utils/cn';
import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses';
import { updateElementPosition } from '@/utils/updateElementPosition';

const Element = () => {
  const { boxRef } = useContext(RockPaperScissorsContext);
  const direction = useRef(generateRandomCathetuses());
  const positionRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: x,
      axis: 'dx',
      direction
    });
  });

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: y,
      axis: 'dy',
      direction
    });
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
