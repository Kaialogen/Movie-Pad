import { useState } from 'react';

import MoreInfoButton from './MoreInfoButton';
import AddToBasketButton from './AddToBasketButton';

import './ShopGrid.css';
import movies from '../../db/movies';

export default function ShopGrid() {
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

  return (
    <div className='grid-container' id='grid'>
      {movies.map((movie) => (
        <div key={movie.id} className='container'>
          <img src={movie.image} alt={movie.name} className='image' />
          <div className='middle'>
            <h3 className='text-title'>{movie.name}</h3>
            <p className='text'>Price: £{movie.price.toFixed(2)} per day</p>
            <input type='number' id='days-to-rent-1' name='quantity' value={days} onChange={handleDaysChange} />
            <AddToBasketButton movieId={movie.id} days={days} />
            <MoreInfoButton movieId={movie.id} />
            <p className='text'>{movie.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
