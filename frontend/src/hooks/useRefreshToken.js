import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.post('/user/refresh');
    setAuth((prev) => ({
      ...prev,
      access_token: response.data.access_token,
      first_name: response.data.first_name,
      is_admin: response.data.is_admin,
    }));
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
