import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// reset the default browser styles
import 'normalize.css/normalize.css';

// import Roboto font, as it's used by Material-UI.
// @see https://mui.com/material-ui/getting-started/installation/#roboto-font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import global styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
