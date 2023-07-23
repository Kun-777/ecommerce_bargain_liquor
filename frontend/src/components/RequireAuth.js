import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ adminOnly }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.access_token ? (
    adminOnly ? (
      auth.is_admin ? (
        <Outlet />
      ) : (
        <Navigate to='/' />
      )
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
