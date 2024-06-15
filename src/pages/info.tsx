import { useEffect, useState } from 'react';

import { ElementIcon } from '@/components/ui/element-icon';
import { cn } from '@/utils/cn';

const Info = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <article
      className={cn([
        'flex h-full flex-col gap-4 bg-gray-800 p-8',
        'transition-transform duration-500 ease-out',
        'sm:px-[10%]',
        'lg:px-[20%]',
        '[&>h2]:mt-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-white',
        '[&>h3]:mt-2 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white',
        '[&>p]:text-lg [&>p]:text-gray-300',
        '[&>ul]:list-inside [&>ul]:list-disc [&>ul]:text-lg [&>ul]:text-gray-300',
        isVisible
          ? 'translate-x-0 transform opacity-100'
          : '-translate-x-full transform opacity-100'
      ])}
    >
      <h1 className="mb-4 text-3xl font-bold text-white">Game Instructions</h1>
      <p>Welcome to the Rock-Paper-Scissors Game!</p>
      <p>
        In this game, you will encounter a dynamic environment where different
        elements move freely within a box. These elements can be either Rock,
        Paper, or Scissors, and they interact with each other in unique ways
        based on the classic rules of Rock-Paper-Scissors. Here&apos;s how the
        game works:
      </p>
      <h2>Elements:</h2>
      <ul
        className={cn([
          '[&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:gap-3'
        ])}
      >
        <li>
          <ElementIcon elementType="rock" className={cn(['h-6 w-6'])} />
          <strong>Rock</strong>
        </li>
        <li>
          <ElementIcon elementType="paper" className={cn(['h-6 w-6'])} />
          <strong>Paper</strong>
        </li>
        <li>
          <ElementIcon elementType="scissors" className={cn(['h-6 w-6'])} />
          <strong>Scissors</strong>
        </li>
      </ul>
      <h2>Game Mechanics:</h2>
      <h3>1. Movement:</h3>
      <ul>
        <li>All elements move freely within the boundaries of the box.</li>
        <li>
          Each element travels in random directions and can change direction
          upon hitting the box&apos;s edges.
        </li>
      </ul>
      <h3>2. Interactions:</h3>
      <ul>
        <li>
          When two elements touch each other, they undergo a transformation
          based on the rules of Rock-Paper-Scissors:
          <ul className="list-inside list-disc pl-4">
            <li>
              <strong>Rock vs. Paper</strong>: The Rock transforms into Paper.
            </li>
            <li>
              <strong>Paper vs. Scissors</strong>: The Paper transforms into
              Scissors.
            </li>
            <li>
              <strong>Scissors vs. Rock</strong>: The Scissors transforms into
              Rock.
            </li>
          </ul>
        </li>
        <li>
          When identical elements touch, they remain the same (e.g., Rock
          touching another Rock stays as Rock).
        </li>
        <li>
          The element that &quot;wins&quot; in the interaction causes the other
          element to transform into its type.
        </li>
      </ul>
      <h2>Objective:</h2>
      <p>
        The main objective of the game is to observe how elements interact and
        transform within the box. You can enjoy watching the endless
        transformations as elements continue to move and interact according to
        the rules.
      </p>
      <p>
        Feel free to sit back, relax, and enjoy the mesmerizing dance of Rock,
        Paper, and Scissors as they perpetually change and evolve within the
        game.
      </p>
      <p>Have fun!</p>
    </article>
  );
};

export { Info };
