import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { selectIsLoggedIn } from '@store/authSlice';

const PublicRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? <Outlet /> : <Navigate to=".." />;
};

export default PublicRoute;
