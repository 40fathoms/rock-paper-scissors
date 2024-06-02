import { RockPaperScissorsContext } from '@/contexts/RockPaperScissorsContext'
import { cn } from '@/utils/cn'
import { Element } from './element'
import { useContext } from 'react'

const Box = () => {
  const { boxRef } = useContext(RockPaperScissorsContext)

  return (
    <div
      ref={boxRef}
      className={cn([
        'relative h-96 w-96 border-2 border-white',
        'sm:h-[31rem] sm:w-[31rem]',
      ])}
    >
      <Element />
    </div>
  )
}

export { Box }
