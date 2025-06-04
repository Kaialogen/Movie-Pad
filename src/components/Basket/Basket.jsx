import { useState, useEffect } from 'react';
import ClearBasketButton from '../ClearBasketButton/ClearBasketButton';
import CheckoutBasketButton from '../CheckoutBasketButton/CheckoutBasketButton';

export default function Basket() {
  const [basket, setBasket] = useState([]);
  const [save, setSave] = useState([]);

  useEffect(() => {
    const storedBasket = JSON.parse(sessionStorage.getItem('basket') ?? '[]');
    const storedSave = JSON.parse(sessionStorage.getItem('save') ?? '[]');
    setBasket(storedBasket);
    setSave(storedSave);
  }, []);

  const updateStorage = (updatedBasket, updatedSave) => {
    setBasket(updatedBasket);
    setSave(updatedSave);
    sessionStorage.setItem('basket', JSON.stringify(updatedBasket));
    sessionStorage.setItem('save', JSON.stringify(updatedSave));
  };

  const RemoveMovie = (movieinput) => {
    const index = basket.findIndex((item) => item.name === movieinput);
    if (index > -1) {
      const updatedBasket = [...basket];
      const updatedSave = [...save];
      updatedBasket.splice(index, 1);
      updatedSave.splice(index, 1);
      updateStorage(updatedBasket, updatedSave);
    }
  };

  const AddDays = (movieName) => {
    const index = basket.findIndex((item) => item.name === movieName);
    if (index > -1 && basket[index].rentDays < 30) {
      const updatedBasket = [...basket];
      updatedBasket[index].rentDays += 1;
      updateStorage(updatedBasket, save);
    } else if (index > -1) {
      alert('Sorry you cannot rent a movie longer than 30 days.');
    }
  };

  const SubDays = (movieName) => {
    const index = basket.findIndex((item) => item.name === movieName);
    if (index > -1) {
      const updatedBasket = [...basket];
      const updatedSave = [...save];
      if (updatedBasket[index].rentDays > 1) {
        updatedBasket[index].rentDays -= 1;
        updateStorage(updatedBasket, updatedSave);
      } else {
        updatedBasket.splice(index, 1);
        updatedSave.splice(index, 1);
        updateStorage(updatedBasket, updatedSave);
      }
    }
  };

  let totalPrice = basket.reduce((acc, item) => acc + item.price * item.rentDays, 0);

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
              {basket.map((basketItem) => {
                const itemPrice = (basketItem.price * basketItem.rentDays).toFixed(2);
                return (
                  <tr key={basketItem.name}>
                    <td>
                      <button onClick={() => RemoveMovie(basketItem.name)} className='red-x'>
                        x
                      </button>{' '}
                      {basketItem.name}
                    </td>
                    <td>
                      <button onClick={() => SubDays(basketItem.name)} className='neg'>
                        -
                      </button>{' '}
                      {basketItem.rentDays}{' '}
                      <button onClick={() => AddDays(basketItem.name)} className='add'>
                        +
                      </button>
                    </td>
                    <td>£{itemPrice}</td>
                  </tr>
                );
              })}
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
