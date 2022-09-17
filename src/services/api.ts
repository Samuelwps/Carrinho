import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://car-api-ecc.herokuapp.com',
});