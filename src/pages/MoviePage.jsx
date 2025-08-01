import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import AddToBasketButton from '../components/AddToBasketbutton/AddToBasketButton';
import './MoviePage.css';
import movies from '../db/movies';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [days, setDays] = useState(3);

  // Function to handle changes in the number of days input
  const handleDaysChange = (event) => {
    const value = event.target.value;
    // Ensure the value is a number and within the range of 1 to 30
    if (value >= 1 && value <= 30) {
      setDays(value);
    } else {
      alert('Please enter a valid number of days (1-30).');
    }
  };

  useEffect(() => {
    const movieId = parseInt(id, 10);
    const selectedMovie = movies.find((m) => m.id === movieId);
    setMovie(selectedMovie);
  }, [id]);

  if (!movie) {
    return (
      <>
        <NavBar />
        <div className='text-white' style={{ padding: '2rem' }}>
          Movie not found.
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div id='main'>
        <article className='text'>
          <br />
          <br />
          <br />
          <img className='image-1' id='movie-image' src={movie.image} alt={`${movie.name} Poster`} />
          <iframe
            width='560'
            height='350'
            id='movie-video'
            src={movie.video}
            style={{ border: 'none' }}
            title='YouTube'
          ></iframe>
          <h1 className='text-movie text-white' id='movie-title'>
            {movie.name}
          </h1>

          <div className='row'>
            <p className='text-white' id='movie-description'>
              {movie.description}
            </p>
            <br />
            <br />
            <div className='column left'>
              <strong className='text-white'>Release Date: </strong>
              <p className='text-white' id='movie-release-date'>
                {movie.releaseDate}
              </p>
              <strong className='text-white'>Genres: </strong>
              <p className='text-white' id='movie-genre'>
                {movie.genre}
              </p>
            </div>
            <div className='column right'>
              <strong className='text-white'>Director: </strong>
              <p className='text-white' id='movie-director'>
                {movie.director}
              </p>
              <strong className='text-white'>Actors: </strong>
              <p className='text-white' id='movie-actors'>
                {movie.actors}
              </p>
            </div>
          </div>
          <br />
          <strong className='text-white'>Price per day</strong>
          <p className='text-white' id='movie-price'>
            £{movie.price.toFixed(2)}
          </p>
          <input type='number' name='quantity' value={days} onChange={handleDaysChange} />
          <AddToBasketButton movieId={movie.id} days={days} />
        </article>
      </div>
    </>
  );
}
