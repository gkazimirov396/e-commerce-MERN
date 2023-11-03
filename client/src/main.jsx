import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigProvider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { store } from '@store/store';

import { theme } from '@utils/theme';

import ErrorPage from '@pages/Error/Error';

import App from './App';

import '@assets/scss/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ConfigProvider theme={theme}>
            <App />
          </ConfigProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
