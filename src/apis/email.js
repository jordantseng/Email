import axios from 'axios';

const CancelToken = axios.CancelToken;
export let cancel;

const emailService = axios.create({
  baseURL: 'https://api.angular-email.com',
  withCredentials: true,
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});

export default emailService;
