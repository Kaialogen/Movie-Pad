// components/BasketWidget/BasketWidget.js
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

import './BasketWidget.css';

export default function BasketWidget() {
  const basket = useSelector((state) => state.basket.basket);

  const totalPrice = basket.reduce((sum, item) => sum + item.price * item.rentDays, 0).toFixed(2);

  return (
    <div className='basket-widget-col-25'>
      <div className='basket-widget-container'>
        <h4>
          Cart{' '}
          <span className='price'>
            <FaShoppingCart />
            <b>{basket.length}</b>
          </span>
        </h4>
        <table className='basket-widget-table'>
          <thead>
            <tr className='basket-widget-table-header'>
              <th>Movie</th>
              <th>Days</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className='basket-widget-table-body'>
            {basket.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.rentDays}</td>
                <td>£{(item.price * item.rentDays).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className='basket-widget' />
        <strong>Total Price:</strong> £<span id='total-price'>{totalPrice}</span>
      </div>
    </div>
  );
}
