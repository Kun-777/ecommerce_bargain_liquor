import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios('/user/refresh', {
      method: 'post',
      xsrfCookieName: 'csrf_refresh_token',
      xsrfHeaderName: 'X-CSRF-TOKEN',
      withCredentials: true,
    });
    if (response.data.access_token) {
      setAuth((prev) => ({
        ...prev,
        access_token: response.data.access_token,
        first_name: response.data.first_name,
        is_admin: response.data.is_admin,
      }));
      return response.data.access_token;
    } else {
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
