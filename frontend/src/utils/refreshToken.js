import { axiosPrivate } from '../api/axios';

export const refreshToken = async () => {
  try {
    const resp = await axiosPrivate.post('/refresh');
    console.log('new jwt token', resp.data);
    return resp.data;
  } catch (e) {
    console.log('Error', e);
  }
};
