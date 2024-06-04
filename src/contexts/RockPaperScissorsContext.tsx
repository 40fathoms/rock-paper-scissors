import type { ElementRef, MutableRefObject, ReactNode, RefObject } from 'react';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { Point, QuadTree, Rectangle } from '@/classes/quadTree';

interface IRockPaperScissorsContext {
  boxRef: RefObject<HTMLDivElement>;
  quadTree: MutableRefObject<QuadTree>;
  updateQuadTree: (point: Point, id: string) => void;
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
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 400;
      const y = Math.random() * 400;
      const point = new Point(x, y, `${i}`);
      quadTree.current.insert(point);
      // console.log(`Inserted point ${point.id} at (${point.x}, ${point.y})`);
    }
    setInitialized(true);
  }, []);

  const updateQuadTree = useCallback((point: Point) => {
    quadTree.current.update(point);
    // console.log(`Updated point ${point.id} to (${point.x}, ${point.y})`);
  }, []);

  return (
    <RockPaperScissorsContext.Provider
      value={{ boxRef, quadTree, updateQuadTree }}
    >
      {initialized ? children : null}
    </RockPaperScissorsContext.Provider>
  );
};

export { RockPaperScissorsContext, RockPaperScissorsContextProvider };
