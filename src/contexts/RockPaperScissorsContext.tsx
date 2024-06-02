import { ElementRef, ReactNode, RefObject, createContext, useRef } from 'react'

interface IRockPaperScissorsContext {
  boxRef: RefObject<HTMLDivElement>
}

const RockPaperScissorsContext = createContext<IRockPaperScissorsContext>(
  {} as IRockPaperScissorsContext,
)

interface IRockPaperScissorsContextProvider {
  children: ReactNode
}

const RockPaperScissorsContextProvider = ({
  children,
}: IRockPaperScissorsContextProvider) => {
  const boxRef = useRef<ElementRef<'div'>>(null)

  return (
    <RockPaperScissorsContext.Provider value={{ boxRef }}>
      {children}
    </RockPaperScissorsContext.Provider>
  )
}

export { RockPaperScissorsContext, RockPaperScissorsContextProvider }
