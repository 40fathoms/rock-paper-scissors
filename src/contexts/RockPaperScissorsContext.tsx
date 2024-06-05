import type {
  Dispatch,
  ElementRef,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction
} from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import type { Point } from '@/classes/quadTree';
import { QuadTree, Rectangle } from '@/classes/quadTree';

interface IRockPaperScissorsContext {
  boxRef: RefObject<HTMLDivElement>;
  quadTree: MutableRefObject<QuadTree>;
  renderedQuadTree: QuadTree;
  setRenderedQuadTree: Dispatch<SetStateAction<QuadTree | undefined>>;
  updateQuadTree: (point: Point) => void;
  updateRenderedQuadTree: () => void;
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

  const [renderedQuadTree, setRenderedQuadTree] = useState<QuadTree>();

  // useState [...new rock, ...new paper, ...new scissors] default points

  useEffect(() => {
    QuadTree.CreateQuadTree(quadTree.current);
    setRenderedQuadTree(quadTree.current);
  }, []);

  const updateQuadTree = useCallback((point: Point) => {
    quadTree.current.update(point);
  }, []);

  const updateRenderedQuadTree = useCallback(() => {
    setRenderedQuadTree((previousQuadTree) => {
      if (!previousQuadTree) return;

      const newQuadTree = new QuadTree(
        previousQuadTree.boundary,
        previousQuadTree.capacity
      );

      newQuadTree.points = new Map(quadTree.current.points);

      return newQuadTree;
    });
  }, []);

  return renderedQuadTree ? (
    <RockPaperScissorsContext.Provider
      value={{
        boxRef,
        quadTree,
        renderedQuadTree,
        setRenderedQuadTree,
        updateQuadTree,
        updateRenderedQuadTree
      }}
    >
      {children}
    </RockPaperScissorsContext.Provider>
  ) : null;
};

export { RockPaperScissorsContext, RockPaperScissorsContextProvider };
