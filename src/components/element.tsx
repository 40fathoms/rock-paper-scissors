import { motion, useMotionValue } from 'framer-motion';
import { useContext, useRef, useState } from 'react';

import { ElementIcon } from './ui/element-icon';

import type { ElementTypes } from '@/classes/QuadTree';
import { Point } from '@/classes/QuadTree';
import { RockPaperScissorPoints } from '@/classes/RockPaperScissorPoints';
import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { cn } from '@/utils/cn';
import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses';
import { updateElementPosition } from '@/utils/updateElementPosition';

interface IElement {
  id: string;
  initialX: number;
  initialY: number;
  elementDefaultType: ElementTypes;
}

const detectionRange = 37; // Define the detection range

const Element = ({ id, initialX, initialY, elementDefaultType }: IElement) => {
  const { boxRef, quadTree, updateQuadTree } = useContext(
    RockPaperScissorsContext
  );

  const direction = useRef(generateRandomCathetuses());
  const [elementType, setElementType] = useState(elementDefaultType);

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const handleCollisions = (point: Point) => {
    const intersectingPoints = quadTree.current.pointsInRange(
      point,
      detectionRange
    );

    const intersectingPointsWithDifferentElementTypes =
      intersectingPoints.filter(
        (intersectingPoint) => intersectingPoint.elementType !== elementType
      );

    intersectingPointsWithDifferentElementTypes.forEach((intersectingPoint) => {
      const newElementType = RockPaperScissorPoints.determineNewElementType(
        elementType,
        intersectingPoint.elementType
      );

      const newPoint = new Point(
        intersectingPoint.x,
        intersectingPoint.y,
        intersectingPoint.id,
        newElementType
      );

      updateQuadTree(newPoint);

      setElementType(newElementType);
    });
  };

  const updatePositionInQuadTree = () => {
    const point = new Point(x.get(), y.get(), id, elementType);
    updateQuadTree(point);
    handleCollisions(point);
  };

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: x,
      axis: 'dx',
      direction
    });
    updatePositionInQuadTree();
  }, [elementType]);

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: y,
      axis: 'dy',
      direction
    });
    updatePositionInQuadTree();
  }, [elementType]);

  return (
    <motion.div
      key={elementType}
      style={{ x, y }}
      className={cn(['absolute h-6 w-6', '[&>img]:h-6 [&>img]:w-6'])}
    >
      <ElementIcon elementType={elementType} />
    </motion.div>
  );
};

export { Element };
