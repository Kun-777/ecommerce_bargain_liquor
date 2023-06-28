import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.post('/refresh');
    setAuth((prev) => ({
      ...prev,
      access_token: response.data.access_token,
      first_name: response.data.first_name,
    }));
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
