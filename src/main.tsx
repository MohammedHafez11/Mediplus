import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import {store} from '../src/redux/store.ts';
import './index.css';
import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';
import 'rsuite/styles/index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <CustomProvider>
      <App />
    </CustomProvider>
    </Provider>
  </React.StrictMode>,
);