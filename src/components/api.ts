import axios from 'axios';

const api = axios.create({
  baseURL: 'http://47.251.71.251:3306',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 