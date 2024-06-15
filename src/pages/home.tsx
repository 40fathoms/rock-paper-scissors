import { Box } from '@/components/box';
import { Stats } from '@/components/stats';
import { RockPaperScissorsContextProvider } from '@/contexts/RockPaperScissorsContext';

const Home = () => {
  return (
    <RockPaperScissorsContextProvider>
      <div className="flex flex-col items-center gap-4 p-8">
        <Stats />
        <Box />
      </div>
    </RockPaperScissorsContextProvider>
  );
};

export { Home };
