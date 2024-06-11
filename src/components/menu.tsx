import type { ComponentProps } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/utils/cn';

interface IMenu extends ComponentProps<'nav'> {}

const Menu = ({ className, ...props }: IMenu) => {
  const { pathname } = useLocation();

  return (
    <nav
      className={cn(
        'fixed inset-x-0 bottom-0 z-10 h-[96px] border-t border-gray-300 bg-gray-800 px-3 py-0',
        'sm:static sm:h-auto sm:border-r sm:border-t-0 sm:py-6',
        className
      )}
      {...props}
    >
      <Link to="/" data-active={pathname === '/'}>
        Home
      </Link>
      <Link to="/info" data-active={pathname === '/info'}>
        Info
      </Link>
    </nav>
  );
};

export { Menu };
