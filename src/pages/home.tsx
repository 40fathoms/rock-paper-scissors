import { Box } from '@/components/box';
import { Stats } from '@/components/stats';
import { RockPaperScissorsContextProvider } from '@/contexts/RockPaperScissorsContext';
import { cn } from '@/utils/cn';

const Home = () => {
  return (
    <RockPaperScissorsContextProvider>
      <div
        className={cn([
          'flex h-full flex-col items-center gap-4 overflow-hidden p-8',
          'sm:overflow-auto'
        ])}
      >
        <Stats />
        <Box />
      </div>
    </RockPaperScissorsContextProvider>
  );
};

export { Home };
