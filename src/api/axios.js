import axios from 'axios';
const BASE_URL = `http://${process.env.REACT_APP_API_HOSTNAME}`;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
