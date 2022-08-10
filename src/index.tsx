import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import store from './redux/store';
import App from './App';
import LoadingHeader from './components/header/LoadingHeader';
import { unregister } from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

root.render(
  <React.StrictMode>
    <Provider store={store().store}>
      <PersistGate loading={<LoadingHeader />} persistor={store().persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

unregister(); // Clear browser cache (hosting fix)
