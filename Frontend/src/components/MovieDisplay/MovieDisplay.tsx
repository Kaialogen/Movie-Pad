import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddToBasketButton from '../AddToBasketbutton/AddToBasketButton.tsx';
import HomepageButton from '../HomepageButton/HomepageButton.tsx';

export default function MovieDisplay() {
  const id = useParams();
  type Movie = {
    id: number;
    name: string;
    description: string;
    image: string;
    video: string;
    releaseDate: string;
    genre: string;
    director: string;
    actors: string;
    price: number;
  };

  const [movie, setMovie] = useState<Movie | null>(null);
  const [days, setDays] = useState(3);

  // Function to handle changes in the number of days input
  const handleDaysChange = (event) => {
    const value = event.target.value;
    if (value >= 1 && value <= 30) {
      setDays(value);
    } else {
      toast.error('Please enter a valid number of days (1-30).');
    }
  };

  useEffect(() => {
    const movieId = parseInt(id.id ?? '', 10);
    if (isNaN(movieId)) {
      console.error('Invalid movie ID');
      return;
    }
    fetch(`http://localhost:8000/api/movies/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
      });
  }, [id]);

  if (!movie) {
    return (
      <>
        <div className='text-center text-2xl text-slate-50 mt-20'>Oops something went wrong</div>
        <div className='text-center text-xl text-slate-50'>Please return to the homepage</div>
        <div className='flex justify-center mt-6'>
          <HomepageButton />
        </div>
      </>
    );
  }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-slate-50'>
      {/* Poster Image */}
      <img
        src={movie.image}
        alt={`${movie.name} Poster`}
        className='rounded-xl shadow-lg w-full h-auto object-cover max-w-sm mx-auto lg:mx-0'
      />

      {/* Trailer and Movie Info */}
      <div className='space-y-6'>
        <iframe
          className='w-full h-64 rounded-xl shadow-lg'
          src={movie.video}
          title={`${movie.name} Trailer`}
          allowFullScreen
        ></iframe>

        <h1 className='text-3xl font-bold'>{movie.name}</h1>
        <p className='text-slate-300 leading-relaxed'>{movie.description}</p>

        <div className='grid grid-cols-2 gap-6 text-sm text-slate-200'>
          <div>
            <p className='font-semibold text-slate-400'>Release Date</p>
            <p>{movie.releaseDate}</p>
            <p className='font-semibold text-slate-400 mt-4'>Genres</p>
            <p>{movie.genre}</p>
          </div>
          <div>
            <p className='font-semibold text-slate-400'>Director</p>
            <p>{movie.director}</p>
            <p className='font-semibold text-slate-400 mt-4'>Actors</p>
            <p>{movie.actors}</p>
          </div>
        </div>

        <div className='pt-4'>
          <p className='text-xl font-semibold text-purple-400'>
            £{movie.price} <span className='text-base font-normal text-slate-300'>per day</span>
          </p>

          <div className='flex items-center gap-4 mt-4'>
            <label htmlFor='days' className='text-slate-400'>
              Rent for:
            </label>
            <input
              type='number'
              min='1'
              value={days}
              onChange={handleDaysChange}
              className='w-24 px-3 py-2 rounded-md bg-white text-slate-900 border border-purple-500 focus:ring-2 focus:ring-purple-600 outline-none'
            />
            <AddToBasketButton movieId={movie.id} days={days} />
          </div>
        </div>
      </div>
    </div>
  );
}
