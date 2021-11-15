import axios from 'axios';

export const getRandomJock = (category?: string) =>
  axios.get('https://api.chucknorris.io/jokes/random', { params: { category } });

export const getSearchingJocks = (query: string) =>
  axios.get(`https://api.chucknorris.io/jokes/search`, { params: { query } });

export const getCategories = () => axios.get('https://api.chucknorris.io/jokes/categories');
