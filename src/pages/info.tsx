import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

const Info = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={cn([
        'h-full bg-gray-800 p-8',
        'transition-transform duration-500 ease-out',
        isVisible
          ? 'translate-x-0 transform opacity-100'
          : '-translate-x-full transform opacity-100'
      ])}
    >
      <p>a</p>
    </div>
  );
};

export { Info };
