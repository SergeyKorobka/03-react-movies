import { useState } from 'react';
import { getAllMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';

type Status = 'idle' | 'loading' | 'error' | 'success';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);

  async function onSubmit(query: string) {
    try {
      setStatus('loading');
      const results = await getAllMovies(query);

      if (!results.length) {
        toast.error('No movies found for your request.');
      }

      setMovies(results);
      setStatus('success');
    } catch {
      setMovies([]);
      setStatus('error');
    }
  }

  function onSelectMovie(movie: Movie) {
    setSelectMovie(movie);
  }

  function onCloseModal() {
    setSelectMovie(null);
  }

  function renderMovieGrid() {
    switch (status) {
      case 'loading':
        return <Loader />;

      case 'error':
        return <ErrorMessage />;

      case 'success':
        return <MovieGrid movies={movies} onSelect={onSelectMovie} />;

      default:
        return null;
    }
  }
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {renderMovieGrid()}
      {selectMovie && <MovieModal movie={selectMovie} onClose={onCloseModal} />}
      <Toaster />
    </>
  );
}
