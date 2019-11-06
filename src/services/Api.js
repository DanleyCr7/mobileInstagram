import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.10.252.168:3001',
});

export default api;
