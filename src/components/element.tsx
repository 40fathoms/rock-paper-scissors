import { motion, useMotionValue } from 'framer-motion';
import { useContext, useRef, useState } from 'react';

import type { ElementTypes } from '@/classes/quadTree';
import { Point } from '@/classes/quadTree';
import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { cn } from '@/utils/cn';
import type { CathetusesDirection } from '@/utils/generateRandomCathetuses';
import { updateElementPosition } from '@/utils/updateElementPosition';
import { determineNewElementType } from '@/utils/determineNewElementType';

interface ElementProps {
  id: string;
  initialX: number;
  initialY: number;
  elementDefaultType: ElementTypes;
  elementDefaultDirection: CathetusesDirection;
}

const detectionRange = 35; // Define the detection range

const elementTypeColor: Record<ElementTypes, string> = {
  rock: 'red',
  paper: 'blue',
  scissors: 'green'
};

const Element = ({
  id,
  initialX,
  initialY,
  elementDefaultType,
  elementDefaultDirection
}: ElementProps) => {
  const { boxRef, quadTree, updateQuadTree } = useContext(
    RockPaperScissorsContext
  );

  const direction = useRef(elementDefaultDirection);
  const elementTypeRef = useRef(elementDefaultType);

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
        (intersectingPoint) =>
          intersectingPoint.options.elementType !== elementTypeRef.current
      );

    intersectingPointsWithDifferentElementTypes.forEach((intersectingPoint) => {
      const newElementType = determineNewElementType(
        elementTypeRef.current,
        intersectingPoint.options.elementType
      );

      const newPoint = new Point(
        intersectingPoint.x,
        intersectingPoint.y,
        intersectingPoint.id,
        {
          elementType: newElementType,
          direction: intersectingPoint.options.direction
        }
      );

      updateQuadTree(newPoint);

      elementTypeRef.current = newElementType;
      setElementType(newElementType);
    });
  };

  const updatePositionInQuadTree = () => {
    const point = new Point(x.get(), y.get(), id, {
      elementType: elementTypeRef.current,
      direction: direction.current
    });
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
  }, []);

  useRequestAnimationFrame(() => {
    updateElementPosition({
      boundaryElementRef: boxRef,
      motionValue: y,
      axis: 'dy',
      direction
    });
    updatePositionInQuadTree();
  }, []);

  return (
    <motion.div
      key={elementType}
      style={{
        x,
        y,
        backgroundColor: elementTypeColor[elementType]
        // backgroundColor: elementTypeColor[elementTypeRef.current]
      }}
      className={cn(['absolute h-5 w-5 bg-white'])}
    >
      {id} <br /> {elementType}
      {/* {id} <br /> {elementTypeRef.current} */}
    </motion.div>
  );
};

export { Element };
