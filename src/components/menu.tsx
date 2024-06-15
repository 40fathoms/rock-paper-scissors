import type { ComponentProps } from 'react';

import { HomeIcon, InfoIcon } from './icons';
import { NavigationLink } from './ui/navigation-link';

import { cn } from '@/utils/cn';

interface IMenu extends ComponentProps<'nav'> {}

const Menu = ({ className, ...props }: IMenu) => {
  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-10 flex h-[96px] items-center justify-around gap-8 border-t border-gray-300 bg-gray-800 px-3 py-0',
        'sm:static sm:flex sm:h-auto sm:flex-col sm:items-center sm:justify-start sm:gap-16 sm:border-r sm:border-t-0 sm:py-8',
        className
      )}
      {...props}
    >
      <NavigationLink to="/" className="flex flex-col items-center gap-2">
        <HomeIcon className="size-6" />
        Home
      </NavigationLink>

      <NavigationLink to="/info" className="flex flex-col items-center gap-2">
        <InfoIcon className="size-6" />
        Info
      </NavigationLink>
    </nav>
  );
};

export { Menu };
