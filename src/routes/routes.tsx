import { AppContainer } from '@components/AppContainer';
import { Home } from '@pages/Home';
import { createBrowserRouter } from 'react-router-dom';

import { appUrls } from './appUrls';

export const routers = createBrowserRouter([
  {
    element: <AppContainer />,
    children: [
      {
        path: appUrls.main,
        element: <Home />,
      },
      {
        path: appUrls.notFound,
        element: <div>Not found</div>,
      },
    ],
  },
]);
