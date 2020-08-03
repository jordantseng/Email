import axios from 'axios';

const emailService = axios.create({
  baseURL: 'https://api.angular-email.com',
  withCredentials: true,
});

export default emailService;
