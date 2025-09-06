import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard.tsx';
import { toast } from 'sonner';

type Movie = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
};

export default function ShopGrid() {
  const [days, setDays] = useState(3);
  const [movies, setMovies] = useState([]);

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 30) {
      setDays(value);
    } else {
      toast.error('Please enter a valid number of days (1–30).');
    }
  };
  useEffect(() => {
    fetch('http://localhost:8000/api/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <div className='px-4 py-8 max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} days={days} onDaysChange={handleDaysChange} />
      ))}
    </div>
  );
}
