import { Box } from '@/components/home/box'
import { RockPaperScissorsContextProvider } from '@/contexts/RockPaperScissorsContext'

const Home = () => {
  return (
    <RockPaperScissorsContextProvider>
      <div className="flex flex-col items-center gap-4">
        <Box />
      </div>
    </RockPaperScissorsContextProvider>
  )
}

export { Home }
