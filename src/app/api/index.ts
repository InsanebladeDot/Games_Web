import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE, // Comment out or remove the proxy URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
