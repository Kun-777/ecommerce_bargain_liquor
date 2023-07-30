import axios from 'axios';
const BASE_URL = `https://${process.env.REACT_APP_API_HOSTNAME}`;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  xsrfCookieName: 'csrf_access_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
  withCredentials: true,
});
