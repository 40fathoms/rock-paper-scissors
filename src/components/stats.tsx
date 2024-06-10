import { useContext, useState } from 'react';

import paper from '@/assets/paper.png';
import rock from '@/assets/rock.png';
import scissors from '@/assets/scissors.png';
import { RockPaperScissorPoints } from '@/classes/RockPaperScissorPoints';
import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';
import { cn } from '@/utils/cn';

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
        'flex flex-row gap-10',
        '[&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:gap-3'
      ])}
    >
      <li>
        <img src={rock} alt="rock" className={cn(['h-6 w-6'])} />
        <span>Rock: {rockOccurences}</span>
      </li>

      <li>
        <img src={paper} alt="paper" className={cn(['h-6 w-6'])} />
        <span>Paper: {paperOccurences}</span>
      </li>

      <li>
        <img src={scissors} alt="scissors" className={cn(['h-6 w-6'])} />
        <span>Scissors: {scissorsOccurences}</span>
      </li>
    </ul>
  );
};

export { Stats };
