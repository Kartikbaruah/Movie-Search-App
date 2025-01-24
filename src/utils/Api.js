import axios from 'axios';

const API_KEY = '7f3f851cdfb50c5e2cc6d014a1e3a15d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenresAPI = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
  return response.data.genres;
};

export const fetchMoviesAPI = async ({ sortBy, selectedGenre, searchQuery }) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: sortBy,
      with_genres: selectedGenre,
      query: searchQuery,
    },
  });
  return response.data.results;
};

export const searchMoviesAPI = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};
