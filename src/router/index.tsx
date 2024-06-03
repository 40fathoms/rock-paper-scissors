import { AppLayout } from '@/layouts/app';
import { Home } from '@/pages/home';
import { createBrowserRouter } from 'react-router-dom';

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
