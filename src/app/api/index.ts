import axios from 'axios';

const instance = axios.create({
  // baseURL: '/', // Comment out or remove the proxy URL
  baseURL: process.env.NEXT_PUBLIC_API_BASE, // Revert to using the environment variable for the backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
