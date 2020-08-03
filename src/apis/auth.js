import axios from 'axios';

const authService = axios.create({
  baseURL: 'https://api.angular-email.com/auth',
  withCredentials: true,
});

export default authService;
