import { useContext, useEffect } from 'react';

import { Element } from './element';

import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { cn } from '@/utils/cn';

const Box = () => {
  const { boxRef, quadTree } = useContext(RockPaperScissorsContext);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('quadTree point 0: ', quadTree.current.points.get('0'));
    }, 1000);

    return () => clearInterval(interval);
  }, [quadTree]);

  return (
    <div
      ref={boxRef}
      className={cn([
        'relative h-96 w-96 border-2 border-white',
        'sm:h-[31rem] sm:w-[31rem]'
      ])}
    >
      {Array.from(quadTree.current.points.values()).map((point) => (
        <Element
          key={point.id}
          id={point.id}
          initialX={point.x}
          initialY={point.y}
        />
      ))}
    </div>
  );
};

export { Box };
