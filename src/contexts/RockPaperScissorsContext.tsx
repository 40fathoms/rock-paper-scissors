import type { ElementRef, MutableRefObject, ReactNode, RefObject } from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import type { Point } from '@/classes/QuadTree';
import { QuadTree, Rectangle } from '@/classes/QuadTree';
import { RockPaperScissorPoints } from '@/classes/RockPaperScissorPoints';
import { useScreenSize } from '@/hooks/useScreenSize';

interface IRockPaperScissorsContext {
  boxRef: RefObject<HTMLDivElement>;
  quadTree: MutableRefObject<QuadTree>;
  updateQuadTree: (point: Point) => void;
}

const RockPaperScissorsContext = createContext<IRockPaperScissorsContext>(
  {} as IRockPaperScissorsContext
);

interface IRockPaperScissorsContextProvider {
  children: ReactNode;
}

const RockPaperScissorsContextProvider = ({
  children
}: IRockPaperScissorsContextProvider) => {
  const { width: screenWidth } = useScreenSize();

  const boxRef = useRef<ElementRef<'div'>>(null);
  const quadTree = useRef(new QuadTree(new Rectangle(0, 0, 600, 600), 100));
  const [isInitialized, setIsInitialized] = useState(false);

  const [initialPoints, _setInitialPoints] = useState<Point[]>(
    new RockPaperScissorPoints(
      {
        rock: 20,
        paper: 20,
        scissors: 20
      },
      {
        screenWidth
      }
    ).createdPoints
  );

  const initializeQuadTree = useCallback(() => {
    setIsInitialized(true);
  }, []);

  const updateQuadTree = useCallback((point: Point) => {
    quadTree.current.update(point);
  }, []);

  useEffect(() => {
    QuadTree.CreateQuadTree(
      quadTree.current,
      initialPoints,
      initializeQuadTree
    );
  }, [initializeQuadTree, initialPoints]);

  return isInitialized ? (
    <RockPaperScissorsContext.Provider
      value={{
        boxRef,
        quadTree,
        updateQuadTree
      }}
    >
      {children}
    </RockPaperScissorsContext.Provider>
  ) : null;
};

export { RockPaperScissorsContext, RockPaperScissorsContextProvider };
