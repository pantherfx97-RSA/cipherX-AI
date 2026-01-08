
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Shim process.env if it doesn't exist to prevent "Script error" on access
if (typeof process === 'undefined') {
  (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
