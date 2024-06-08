import { motion, useMotionValue } from 'framer-motion';
import type { ElementRef } from 'react';
import { useContext, useRef, useState } from 'react';

import type { ElementTypes } from '@/classes/quadTree';
import { Point } from '@/classes/quadTree';
import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { cn } from '@/utils/cn';
import type { CathetusesDirection } from '@/utils/generateRandomCathetuses';
// import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses';
import { updateElementPosition } from '@/utils/updateElementPosition';

interface ElementProps {
  id: string;
  initialX: number;
  initialY: number;
  elementDefaultType: ElementTypes;
  elementDefaultDirection: CathetusesDirection;
}

const detectionRange = 30; // Define the detection range

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
  // const direction = useRef({
  //   dx: 1,
  //   dy: 0
  // });
  // const direction = useRef(generateRandomCathetuses());
  const direction = useRef(elementDefaultDirection);

  const positionRef = useRef<ElementRef<'div'>>(null);

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
          intersectingPoint.options.elementType !== elementType
      );

    intersectingPointsWithDifferentElementTypes.forEach((intersectingPoint) => {
      let newElementType = intersectingPoint.options.elementType;

      if (
        elementType === 'rock' &&
        intersectingPoint.options.elementType === 'scissors'
      ) {
        newElementType = 'rock';
      } else if (
        elementType === 'rock' &&
        intersectingPoint.options.elementType === 'paper'
      ) {
        newElementType = 'paper';
      } else if (
        elementType === 'scissors' &&
        intersectingPoint.options.elementType === 'paper'
      ) {
        newElementType = 'scissors';
      } else if (
        elementType === 'scissors' &&
        intersectingPoint.options.elementType === 'rock'
      ) {
        newElementType = 'rock';
      } else if (
        elementType === 'paper' &&
        intersectingPoint.options.elementType === 'rock'
      ) {
        newElementType = 'paper';
      } else if (
        elementType === 'rock' &&
        intersectingPoint.options.elementType === 'rock'
      ) {
        newElementType = 'rock';
      }

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

      setElementType(newElementType);

      if (positionRef.current && positionRef.current?.style) {
        positionRef.current.style.backgroundColor =
          elementTypeColor[newElementType];
      }
    });
  };

  const updatePositionInQuadTree = () => {
    const point = new Point(x.get(), y.get(), id, {
      elementType: elementType,
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
      ref={positionRef}
      style={{
        x,
        y,
        backgroundColor: elementTypeColor[elementType]
      }}
      className={cn(['absolute h-6 w-6 bg-white'])}
    >
      {id} <br /> {elementType}
    </motion.div>
  );
};

export { Element };
