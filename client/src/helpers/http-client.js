import axios from 'axios';

export const main_server = axios.create({
  baseURL: 'https://api.wahyusattriana.com'
});
