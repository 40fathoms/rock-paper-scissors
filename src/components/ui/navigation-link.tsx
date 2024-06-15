import type { NavLinkProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { cn } from '@/utils/cn';

const NavigationLink = ({ children, className, ...props }: NavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn([
          'text-center text-sm font-medium leading-4',
          'sm:text-base',
          isActive
            ? 'font-semibold text-red-500 underline'
            : 'transition-colors hover:text-red-300',
          className
        ])
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export { NavigationLink };
