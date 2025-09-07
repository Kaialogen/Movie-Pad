import { useDispatch } from 'react-redux';
import { addItem } from '../../store/basketSlice.ts';
import { useMovies } from '../../context/MoviesContext.tsx';
import { toast } from 'sonner';

type AddToBasketButtonProps = {
  movieId: number;
  days: number;
};

export default function AddToBasketButton({ movieId, days }: AddToBasketButtonProps) {
  const dispatch = useDispatch();
  const { movies } = useMovies();

  function addToBasket(movieId: number, daysRent: number) {
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
      toast.error('Movie not found.');
      return;
    }

    const rentalDays = isNaN(daysRent) || daysRent <= 0 ? 1 : Math.min(daysRent, 30);

    if (isNaN(daysRent) || daysRent <= 0) {
      toast.warning('Invalid days. Defaulted to 1.');
    } else if (rentalDays < daysRent) {
      toast.warning('Max rental is 30 days. Adjusted to 30.');
    }

    dispatch(addItem({ id: movie.id, name: movie.name, price: movie.price, rentDays: rentalDays }));

    toast.success(`${movie.name} added for ${rentalDays} days.`);
  }

  return (
    <button
      className='inline-block px-4 py-2 bg-purple-700 text-slate-50 font-inter rounded-[8px] hover:bg-purple-500'
      onClick={() => addToBasket(movieId, days)}
    >
      Add to Basket
    </button>
  );
}
