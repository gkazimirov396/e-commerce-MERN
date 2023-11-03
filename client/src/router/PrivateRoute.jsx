import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectIsLoggedIn } from '@store/authSlice';

const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
