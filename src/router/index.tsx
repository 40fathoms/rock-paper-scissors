import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/layouts/app';
import { Home } from '@/pages/home';
import { Info } from '@/pages/info';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/info',
        element: <Info />
      }
    ]
  }
]);

export { router };
