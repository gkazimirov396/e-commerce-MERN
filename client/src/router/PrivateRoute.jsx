import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectIsLoggedIn } from '@store/authSlice';

import Forbidden from '@pages/Forbidden/Forbidden';

const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Forbidden />;
};

export default PrivateRoute;
