import { createContext, useContext, useEffect, useState } from 'react';

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      setStatus('loading');
      try {
        const response = await fetch('http://localhost:8000/api/movies');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setMovies(data);
        setStatus('success');
      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    }

    fetchMovies();
  }, []);

  return <MoviesContext.Provider value={{ movies, status, error }}>{children}</MoviesContext.Provider>;
}

export function useMovies() {
  return useContext(MoviesContext);
}
