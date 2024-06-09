import { useContext, useState } from 'react';

import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { cn } from '@/utils/cn';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { RockPaperScissorPoints } from '@/classes/RockPaperScissorPoints';

const Stats = () => {
  const { quadTree } = useContext(RockPaperScissorsContext);

  const [rockOccurences, setRockOccurrences] = useState(0);
  const [paperOccurences, setPaperOccurrences] = useState(0);
  const [scissorsOccurences, setScissorsOccurrences] = useState(0);

  useRequestAnimationFrame(() => {
    const { rock, paper, scissors } = RockPaperScissorPoints.GetNumberOfTypes(
      quadTree.current
    );

    if (rock !== rockOccurences) setRockOccurrences(rock);
    if (paper !== paperOccurences) setPaperOccurrences(paper);
    if (scissors !== scissorsOccurences) setScissorsOccurrences(scissors);
  }, [rockOccurences, paperOccurences, scissorsOccurences]);

  return (
    <ul
      className={cn([
        'flex flex-row gap-6',
        '[&>li]:flex [&>li]:flex-col [&>li]:items-center [&>li]:gap-1'
      ])}
    >
      <li>
        <p>Rock</p>
        <p>{rockOccurences}</p>
      </li>

      <li>
        <p>Paper</p>
        <p>{paperOccurences}</p>
      </li>

      <li>
        <p>Scissors</p>
        <p>{scissorsOccurences}</p>
      </li>
    </ul>
  );
};

export { Stats };
