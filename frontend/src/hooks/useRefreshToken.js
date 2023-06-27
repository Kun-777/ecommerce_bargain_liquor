import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.post('/refresh');
    setAuth((prev) => ({ ...prev, access_token: response.data.access_token }));
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
