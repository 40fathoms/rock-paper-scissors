import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/layouts/app';
import { Home } from '@/pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]);

export { router };
