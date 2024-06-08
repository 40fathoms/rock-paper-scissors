import { useEffect } from 'react';

interface IUseRequestAnimationFrame {
  (animationCallback: () => void, dependencyArray: unknown[]): void;
}

/**
 * Custom React hook that uses the `requestAnimationFrame` method to perform smooth animations.
 *
 * @param {() => void} animationCallback - The callback function that will be invoked on each animation frame.
 * @param {unknown[]} [dependencyArray=[]] - The array of dependencies that will trigger the effect when updated.
 * @return {void} This hook does not return anything.
 */
const useRequestAnimationFrame: IUseRequestAnimationFrame = (
  animationCallback,
  dependencyArray = []
) => {
  useEffect(() => {
    let animationId: number;
    const animateElement = () => {
      animationCallback();
      animationId = requestAnimationFrame(animateElement);
    };

    animateElement();

    return () => cancelAnimationFrame(animationId);
  }, dependencyArray);
};

export { useRequestAnimationFrame };
