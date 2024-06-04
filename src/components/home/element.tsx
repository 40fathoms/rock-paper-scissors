import { motion, useMotionValue } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';

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
  color: string;
}

const ELEMENT_SIZE = 24; // Assuming 24x24 pixels for the element size
const DETECTION_RANGE = 30; // Define the detection range

const Element = ({ id, initialX, initialY, color }: ElementProps) => {
  const {
    boxRef,
    quadTree,
    updateQuadTree,
    setRenderedQuadTree,
    renderedQuadTree,
    updateRenderedQuadTree
  } = useContext(RockPaperScissorsContext);
  const direction = useRef({
    dx: 1,
    dy: 0
  });
  // const direction = useRef(generateRandomCathetuses());
  const positionRef = useRef(null);

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const handleCollisions = () => {
    const point = new Point(x.get(), y.get(), id, color);
    const intersectingPoints = quadTree.current.pointsInRange(
      point,
      DETECTION_RANGE
    );

    intersectingPoints.forEach((intersectingPoint) => {
      const newPoint = new Point(
        intersectingPoint.x,
        intersectingPoint.y,
        intersectingPoint.id,
        'green'
      );
      updateQuadTree(newPoint);
      updateRenderedQuadTree();
    });
  };

  const updatePositionInQuadTree = () => {
    const point = new Point(x.get(), y.get(), id, color);
    updateQuadTree(point);
  };

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: x,
      axis: 'dx',
      direction
    });
    updatePositionInQuadTree();
    handleCollisions();

    // if (id === '0') console.log('rendered component color', color);
    // if (id === '0')
    //   console.log('rndered quadTree', renderedQuadTree.points.get(id));
    // if (id === '0')
    //   console.log('ref quadTree', quadTree.current.points.get('0'));
  });

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: y,
      axis: 'dy',
      direction
    });
    updatePositionInQuadTree();
    handleCollisions();
  });

  return (
    <motion.div
      ref={positionRef}
      style={{ x, y, backgroundColor: color }}
      className={cn(['absolute h-6 w-6 bg-white'])}
    />
  );
};

export { Element };
