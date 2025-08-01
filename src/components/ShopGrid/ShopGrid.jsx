import { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import movies from '../../db/movies';

export default function ShopGrid() {
  const [days, setDays] = useState(3);

  const handleDaysChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 30) {
      setDays(value);
    } else {
      alert('Please enter a valid number of days (1–30).');
    }
  };

  return (
    <div className='px-4 py-8 max-w-[1800px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} days={days} onDaysChange={handleDaysChange} />
      ))}
    </div>
  );
}
