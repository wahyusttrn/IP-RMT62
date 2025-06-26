import axios from 'axios';

export const main_server = axios.create({
  baseURL: 'http://localhost:3000'
});
