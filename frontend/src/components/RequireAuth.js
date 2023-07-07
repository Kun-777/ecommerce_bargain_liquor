import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.access_token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;