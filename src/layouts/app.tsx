import { Outlet } from 'react-router-dom';

import { cn } from '@/utils/cn';

const AppLayout = () => {
  return (
    <main
      className={cn([
        'grid min-h-dvh grid-cols-1 grid-rows-[1fr_96px] bg-gray-900',
        'sm:grid-cols-[112px_1fr] sm:grid-rows-1'
      ])}
    >
      <aside className={cn(['order-2 p-4', 'sm:order-1'])}></aside>
      <section className={cn(['order-1 p-8', 'sm:order-2'])}>
        <Outlet />
      </section>
    </main>
  );
};

export { AppLayout };
