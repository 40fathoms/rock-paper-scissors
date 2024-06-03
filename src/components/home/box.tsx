import { useContext } from 'react';

import { Element } from './element';

import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { cn } from '@/utils/cn';

const Box = () => {
  const { boxRef } = useContext(RockPaperScissorsContext);

  return (
    <div
      ref={boxRef}
      className={cn([
        'relative h-96 w-96 border-2 border-white',
        'sm:h-[31rem] sm:w-[31rem]'
      ])}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Element key={index} />
      ))}
    </div>
  );
};

export { Box };
