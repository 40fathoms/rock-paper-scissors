import { useEffect } from 'react';

interface IUseRequestAnimationFrame {
  (animationCallback: () => void): void;
}

/**
 * Custom React hook that uses the `requestAnimationFrame` method to perform smooth animations.
 *
 * @param {() => void} animationCallback - The callback function that will be invoked on each animation frame.
 * @return {void} This hook does not return anything.
 */
const useRequestAnimationFrame: IUseRequestAnimationFrame = (
  animationCallback
) => {
  useEffect(() => {
    let animationId: number;
    const animateElement = () => {
      animationCallback();
      animationId = requestAnimationFrame(animateElement);
    };

    animateElement();

    return () => cancelAnimationFrame(animationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useRequestAnimationFrame };
