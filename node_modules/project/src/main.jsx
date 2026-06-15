import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './index.css';

console.log('React app initializing...');

const root = document.getElementById('root');
if (root) {
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(App)
    )
  );
}
