// components/AddToBasketButton/AddToBasketButton.js
import { useDispatch, useSelector } from 'react-redux';
import { addItem, increaseDays } from '../../store/basketSlice';
import movies from '../../db/movies.js';

export default function AddToBasketButton({ movieId, days }) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);

  function addToBasket(movieId, daysRent) {
    const movie = movies.find((movie) => movie.id === movieId);

    if (!movie) {
      alert('Movie not found.');
      return;
    }

    const rentalDays = isNaN(daysRent) || daysRent <= 0 ? 1 : Math.min(daysRent, 30);

    if (isNaN(daysRent) || daysRent <= 0) {
      alert('Please enter a valid number of days to rent (minimum 1 day). Rent time has been adjusted to 1 day.');
    } else if (rentalDays < daysRent) {
      alert('Sorry, you cannot rent a movie for more than 30 days. Rent time has been adjusted to 30 days.');
    }

    const existing = basket.find((item) => item.id === movie.id);

    if (existing) {
      const currentDays = existing.rentDays;
      const totalDays = currentDays + rentalDays;

      if (totalDays > 30) {
        alert(`You can't rent for more than 30 days total. Setting rent days to 30.`);
        dispatch(addItem({ ...movie, rentDays: 30 }));
      } else {
        for (let i = 0; i < rentalDays; i++) {
          dispatch(increaseDays(movie.name));
        }
        alert(`${movie.name} has been updated in your basket. Total rent time is now ${totalDays} days.`);
      }
    } else {
      dispatch(addItem({ ...movie, rentDays: rentalDays }));
      alert(`${movie.name} has been added to your basket for ${rentalDays} days.`);
    }
  }

  return (
    <button className='AddToBasketButton' onClick={() => addToBasket(movieId, days)}>
      Add to Basket
    </button>
  );
}
