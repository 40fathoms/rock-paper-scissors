import { Box } from '@/components/Box';
import { Stats } from '@/components/Stats';
import { RockPaperScissorsContextProvider } from '@/contexts/RockPaperScissorsContext';

const Home = () => {
  return (
    <RockPaperScissorsContextProvider>
      <div className="flex flex-col items-center gap-4">
        <Stats />
        <Box />
      </div>
    </RockPaperScissorsContextProvider>
  );
};

export { Home };
