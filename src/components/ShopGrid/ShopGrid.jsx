import MoreInfoButton from './MoreInfoButton';
import AddToBasketButton from './AddToBasketButton';

import './ShopGrid.css';
import movies from '../../db/movies';

export default function ShopGrid() {
  return (
    <div className='grid-container' id='grid'>
      {movies.map((movie) => (
        <div key={movie.id} className='container'>
          <img src={movie.image} alt={movie.name} className='image' />
          <div className='middle'>
            <h3 className='text-title'>{movie.name}</h3>
            <p className='text'>Price: £{movie.price.toFixed(2)} per day</p>
            <input type='number' id='days-to-rent-1' name='quantity' min='1' max='30' size='3' value='3' />
            <AddToBasketButton movieId={movie.id} />
            <p className='text'>{movie.description}</p>
            <MoreInfoButton />
          </div>
        </div>
      ))}
    </div>
  );
}
