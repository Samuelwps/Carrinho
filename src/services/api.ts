import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cart-api-ecc.vercel.app',
});