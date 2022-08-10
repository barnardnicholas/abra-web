import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// import { unregister } from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

// Set vh property for mobile devices
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// unregister(); // Clear browser cache (hosting fix)
