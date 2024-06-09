import { useState, useEffect } from 'react';

interface IUseScreenSize {
  (): {
    width: number;
    height: number;
  };
}

/**
 * Custom hook that returns the current screen size.
 *
 * @return {Object} An object containing the width and height of the screen.
 */
const useScreenSize: IUseScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export { useScreenSize };
