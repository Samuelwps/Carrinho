import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cart-ecc.herokuapp.com',
});
