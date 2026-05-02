import axios from 'axios';
import type { Movie } from '../types/movie';

interface getAllMoviesRes {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const apiMovie = axios.create({
  baseURL: 'https://api.themoviedb.org',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export async function getAllMovies(query: string) {
  const { data } = await apiMovie.get<getAllMoviesRes>('/3/search/movie', {
    params: {
      query,
    },
  });

  return data;
}
