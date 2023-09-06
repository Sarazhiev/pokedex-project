import axios from 'axios';

const projectApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://pokeapi.co/api/v2/',
});

export { projectApi };
