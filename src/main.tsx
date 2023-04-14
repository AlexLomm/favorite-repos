import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// reset the default browser styles
import 'normalize.css/normalize.css';

// import Roboto font, as it's used by Material-UI.
// @see https://mui.com/material-ui/getting-started/installation/#roboto-font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { css, Global } from '@emotion/react';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        body {
          min-height: 100vh;
          min-width: 100vw;
        }
      `}
    />

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
