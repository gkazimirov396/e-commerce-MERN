import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import Cart from '@pages/Cart/Cart';
import ErrorPage from '@pages/Error/Error';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import NotFound from '@pages/NotFound/NotFound';
import ProductDetailed from '@pages/ProductDetailed/ProductDetailed';
import ProductsList from '@pages/Products/ProductsList';
import Signup from '@pages/Signup/Signup';

import Layout from '@components/Layout/Layout';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/products',
            children: [
              {
                index: true,
                element: <ProductsList />,
              },
              {
                path: ':productId',
                element: <ProductDetailed />,
              },
            ],
          },
          {
            element: <PrivateRoute />,
            children: [
              {
                path: '/cart',
                element: <Cart />,
              },
            ],
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/register',
            element: <Signup />,
          },
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
