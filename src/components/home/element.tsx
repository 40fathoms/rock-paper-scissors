import { motion, useMotionValue } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';

import type { ElementTypes } from '@/classes/quadTree';
import { Point, QuadTree } from '@/classes/quadTree';
import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { cn } from '@/utils/cn';
import { generateRandomCathetuses } from '@/utils/generateRandomCathetuses';
import { updateElementPosition } from '@/utils/updateElementPosition';

interface ElementProps {
  id: string;
  initialX: number;
  initialY: number;
  elementType: ElementTypes;
}

const DETECTION_RANGE = 24; // Define the detection range

const elementTypeColor: Record<ElementTypes, string> = {
  rock: 'red',
  paper: 'blue',
  scissors: 'green'
};

const Element = ({ id, initialX, initialY, elementType }: ElementProps) => {
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
    const point = new Point(x.get(), y.get(), id, elementType);
    const intersectingPoints = quadTree.current.pointsInRange(
      point,
      DETECTION_RANGE
    );

    intersectingPoints.forEach((intersectingPoint) => {
      let newElementType = intersectingPoint.elementType;

      if (
        elementType === 'rock' &&
        intersectingPoint.elementType === 'scissors'
      ) {
        newElementType = 'rock';
      } else if (
        elementType === 'rock' &&
        intersectingPoint.elementType === 'paper'
      ) {
        newElementType = 'paper';
      } else if (
        elementType === 'scissors' &&
        intersectingPoint.elementType === 'paper'
      ) {
        newElementType = 'scissors';
      } else if (
        elementType === 'scissors' &&
        intersectingPoint.elementType === 'rock'
      ) {
        newElementType = 'rock';
      } else if (
        elementType === 'paper' &&
        intersectingPoint.elementType === 'rock'
      ) {
        newElementType = 'paper';
      } else if (
        elementType === 'rock' &&
        intersectingPoint.elementType === 'rock'
      ) {
        newElementType = 'rock';
      }

      const newPoint = new Point(
        intersectingPoint.x,
        intersectingPoint.y,
        intersectingPoint.id,
        newElementType
      );

      updateQuadTree(newPoint);

      if (positionRef.current && positionRef.current.style) {
        positionRef.current.style.backgroundColor =
          elementTypeColor[newElementType];
      }
    });
  };

  const updatePositionInQuadTree = () => {
    const point = new Point(x.get(), y.get(), id, elementType);
    updateQuadTree(point);
    handleCollisions();
  };

  useRequestAnimationFrame(() => {
    const occurrences = QuadTree.GetNumberOfTypes(quadTree.current);
    console.log('occurrences: ', occurrences);
  });

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
      style={{ x, y, backgroundColor: elementTypeColor[elementType] }}
      className={cn(['absolute h-6 w-6 bg-white'])}
    />
  );
};

export { Element };
