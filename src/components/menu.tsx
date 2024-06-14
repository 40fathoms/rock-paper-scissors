import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { cn } from '@/utils/cn';

interface IMenu extends ComponentProps<'nav'> {}

const Menu = ({ className, ...props }: IMenu) => {
  const { pathname } = useLocation();

  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-10 flex h-[96px] items-center justify-around gap-8 border-t border-gray-300 bg-gray-800 px-3 py-0',
        'sm:static sm:flex sm:h-auto sm:flex-col sm:items-center sm:justify-start sm:gap-8 sm:border-r sm:border-t-0 sm:py-6',
        className
      )}
      {...props}
    >
      <NavLink to="/">
        {({ isActive }) => (
          <span
            className={cn([
              'text-center text-sm font-medium leading-4',
              'sm:text-base',
              isActive && 'font-semibold text-red-500 underline'
            ])}
          >
            Home
          </span>
        )}
      </NavLink>

      <NavLink to="/info">
        {({ isActive }) => (
          <span
            className={cn([
              'text-center text-sm font-medium leading-4',
              'sm:text-base',
              isActive && 'font-semibold text-red-500 underline'
            ])}
          >
            Info
          </span>
        )}
      </NavLink>
    </nav>
  );
};

export { Menu };
