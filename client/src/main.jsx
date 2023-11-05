import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { store } from '@store/store';

import { theme } from '@utils/theme';

import App from './App';

import '@assets/scss/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ConfigProvider theme={theme}>
          <App />
        </ConfigProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
