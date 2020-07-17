import axios from 'axios';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();
const authService = axios.create({
  baseURL: 'https://api.angular-email.com',
  withCredentials: true,
  cancelToken: source.token,
});

export default authService;
