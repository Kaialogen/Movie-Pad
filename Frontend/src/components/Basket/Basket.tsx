import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadFromStorage, removeItem, increaseDays, decreaseDays } from '../../store/basketSlice.ts';

import ClearBasketButton from '../ClearBasketButton/ClearBasketButton.tsx';
import CheckoutBasketButton from '../CheckoutBasketButton/CheckoutBasketButton.tsx';

interface BasketItem {
  name: string;
  price: number;
  rentDays: number;
}

export default function Basket() {
  const dispatch = useDispatch();

  const basket = useSelector((state: any) => state.basket.basket);

  // Load from sessionStorage on mount
  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const handleAddDays = (movieName: string) => {
    const item = basket.find((item: BasketItem) => item.name === movieName);
    if (item?.rentDays >= 30) {
      alert('Sorry you cannot rent a movie longer than 30 days.');
      return;
    }
    dispatch(increaseDays(movieName));
  };

  const handleSubDays = (movieName: string) => {
    dispatch(decreaseDays(movieName));
  };

  const handleRemoveMovie = (movieName: string) => {
    dispatch(removeItem(movieName));
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
              <tr key={item.name}>
                <td>
                  <button onClick={() => handleRemoveMovie(item.name)} className='text-red-600'>
                    x
                  </button>{' '}
                  {item.name}
                </td>
                <td>
                  <button onClick={() => handleSubDays(item.name)} className='hover:cursor-pointer'>
                    -
                  </button>{' '}
                  {item.rentDays}{' '}
                  <button onClick={() => handleAddDays(item.name)} className='hover:cursor-pointer'>
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
