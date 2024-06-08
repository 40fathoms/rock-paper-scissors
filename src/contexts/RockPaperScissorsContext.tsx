import type { ElementRef, MutableRefObject, ReactNode, RefObject } from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import type { Point } from '@/classes/quadTree';
import { QuadTree, Rectangle } from '@/classes/quadTree';
import { useRequestAnimationFrame } from '@/hooks/useRequestAnimationFrame';

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
  const boxRef = useRef<ElementRef<'div'>>(null);
  const quadTree = useRef(new QuadTree(new Rectangle(0, 0, 600, 600), 30));
  const [isInitialized, setIsInitialized] = useState(false);

  // useState [...new rock, ...new paper, ...new scissors] default points

  const initializeQuadTree = useCallback((_createdQuadTree: QuadTree) => {
    setIsInitialized(true);
  }, []);

  const updateQuadTree = useCallback((point: Point) => {
    quadTree.current.update(point);
  }, []);

  useEffect(() => {
    QuadTree.CreateQuadTree(quadTree.current, initializeQuadTree);
  }, [initializeQuadTree]);

  const [reRenderCount, setReRenderCount] = useState(0);

  useRequestAnimationFrame(() => {
    setReRenderCount((prev) => prev + 1);
  });

  return isInitialized ? (
    <RockPaperScissorsContext.Provider
      value={{
        boxRef,
        quadTree,
        updateQuadTree
      }}
    >
      <div key={reRenderCount}>{children}</div>
    </RockPaperScissorsContext.Provider>
  ) : null;
};

export { RockPaperScissorsContext, RockPaperScissorsContextProvider };
