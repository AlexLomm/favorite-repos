import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import React from 'react';
import SavedRepositories from './pages/SavedRepositories/SavedRepositories';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/saved-repositories',
    element: <SavedRepositories />,
  },
]);

export default router;
