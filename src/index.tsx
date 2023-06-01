import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './view/app/App';
import { ErrorBoundary } from './utils/error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
