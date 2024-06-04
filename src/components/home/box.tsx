import { useContext, useMemo } from 'react';

import { Element } from './element';

import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { cn } from '@/utils/cn';

const Box = () => {
  const { boxRef, renderedQuadTree, quadTree } = useContext(
    RockPaperScissorsContext
  );

  const quadTreePoints = useMemo(() => {
    return Array.from(renderedQuadTree.points.values());
  }, [renderedQuadTree, quadTree.current]);
  console.log('quadTreePoints: ', quadTreePoints);

  return (
    <div
      ref={boxRef}
      className={cn([
        'relative h-96 w-96 border-2 border-white',
        'sm:h-[31rem] sm:w-[31rem]'
      ])}
    >
      {Array.from(renderedQuadTree.points.values()).map((point) => (
        <Element
          key={point.id}
          id={point.id}
          initialX={point.x}
          initialY={point.y}
          color={point.color}
        />
      ))}
    </div>
  );
};

export { Box };
