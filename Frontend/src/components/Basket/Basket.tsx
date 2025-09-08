import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseDays, decreaseDays } from '../../store/basketSlice.ts';
import { toast } from 'sonner';

import ClearBasketButton from '../ClearBasketButton/ClearBasketButton.tsx';
import CheckoutBasketButton from '../CheckoutBasketButton/CheckoutBasketButton.tsx';

interface BasketItem {
  id: number;
  name: string;
  price: number;
  rentDays: number;
}

export default function Basket() {
  const dispatch = useDispatch();
  const basket = useSelector((state: any) => state.basket.basket);

  const handleAddDays = (movieId: number, currentDays: number) => {
    if (currentDays >= 30) {
      toast.error('Sorry you cannot rent a movie longer than 30 days.');
      return;
    }
    dispatch(increaseDays(movieId));
  };

  const handleSubDays = (movieId: number) => {
    dispatch(decreaseDays(movieId));
  };

  const handleRemoveMovie = (movieId: number) => {
    dispatch(removeItem(movieId));
  };

  const totalPrice = basket.reduce((acc: number, item: BasketItem) => acc + item.price * item.rentDays, 0);

  return (
    <section className='flex-grow w-full p-12'>
      <h1 className='text-center text-4xl font-bold mb-12 pb-5 pt-10 text-slate-50'>Basket</h1>
      <div className='bg-slate-100 w-1/2 mx-auto p-8 rounded-3xl space-y-8 mt-10'>
        <table className='w-full'>
          <thead>
            <tr className='text-slate-900 text-left'>
              <th className='th1'>Movie</th>
              <th className='th2'>Days</th>
              <th className='th3'>Price</th>
            </tr>
          </thead>
          <tbody className='text-slate-900 text-left'>
            {basket.map((item: BasketItem) => (
              <tr key={item.id}>
                <td>
                  <button onClick={() => handleRemoveMovie(item.id)} className='text-red-600'>
                    x
                  </button>{' '}
                  {item.name}
                </td>
                <td>
                  <button onClick={() => handleSubDays(item.id)} className='hover:cursor-pointer'>
                    -
                  </button>{' '}
                  {item.rentDays}{' '}
                  <button onClick={() => handleAddDays(item.id, item.rentDays)} className='hover:cursor-pointer'>
                    +
                  </button>
                </td>
                <td>£{(item.price * item.rentDays).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className='text-slate-900' />
        <div className='text-right text-slate-900 font-bold pt-2'>
          <strong>Total Price:</strong> £<span>{totalPrice.toFixed(2)}</span>
        </div>
        <div className='pt-2 flex justify-center items-center gap-4'>
          <CheckoutBasketButton />
          <ClearBasketButton />
        </div>
      </div>
    </section>
  );
}
