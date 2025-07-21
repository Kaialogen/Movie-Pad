// components/Basket/Basket.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadFromStorage, removeItem, increaseDays, decreaseDays } from '../../store/basketSlice';

import ClearBasketButton from '../ClearBasketButton/ClearBasketButton';
import CheckoutBasketButton from '../CheckoutBasketButton/CheckoutBasketButton';

export default function Basket() {
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.basket.basket);
  const save = useSelector((state) => state.basket.save);

  // Load from sessionStorage on mount
  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  // Save to sessionStorage whenever basket or save changes
  useEffect(() => {
    sessionStorage.setItem('basket', JSON.stringify(basket));
    sessionStorage.setItem('save', JSON.stringify(save));
  }, [basket, save]);

  const handleAddDays = (movieName) => {
    const item = basket.find((item) => item.name === movieName);
    if (item?.rentDays >= 30) {
      alert('Sorry you cannot rent a movie longer than 30 days.');
      return;
    }
    dispatch(increaseDays(movieName));
  };

  const handleSubDays = (movieName) => {
    dispatch(decreaseDays(movieName));
  };

  const handleRemoveMovie = (movieName) => {
    dispatch(removeItem(movieName));
  };

  const totalPrice = basket.reduce((acc, item) => acc + item.price * item.rentDays, 0);

  return (
    <div className='invoice'>
      <article>
        <br />
        <br />
        <br />
        <h1>Basket</h1>
        <div className='container'>
          <table>
            <thead>
              <tr>
                <th className='th1'>Movie</th>
                <th className='th2'>Days</th>
                <th className='th3'>Price</th>
              </tr>
            </thead>
            <tbody>
              {basket.map((item) => (
                <tr key={item.name}>
                  <td>
                    <button onClick={() => handleRemoveMovie(item.name)} className='red-x'>
                      x
                    </button>{' '}
                    {item.name}
                  </td>
                  <td>
                    <button onClick={() => handleSubDays(item.name)} className='neg'>
                      -
                    </button>{' '}
                    {item.rentDays}{' '}
                    <button onClick={() => handleAddDays(item.name)} className='add'>
                      +
                    </button>
                  </td>
                  <td>£{(item.price * item.rentDays).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />
          <div className='right-align-text'>
            <strong>Total Price:</strong> £<span>{totalPrice.toFixed(2)}</span>
          </div>
          <hr />
          <CheckoutBasketButton />
          <ClearBasketButton />
        </div>
      </article>
    </div>
  );
}
