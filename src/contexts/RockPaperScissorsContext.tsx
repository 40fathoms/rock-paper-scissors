import type {
  Dispatch,
  ElementRef,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction
} from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { Point, QuadTree, Rectangle } from '@/classes/quadTree';

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
  const quadTree = useRef(new QuadTree(new Rectangle(0, 0, 400, 400), 10));

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
    console.log('quadTree.current: ', quadTree.current.points.get('0'));
    setRenderedQuadTree(quadTree.current);
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
