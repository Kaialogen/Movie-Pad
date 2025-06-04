import { FaShoppingCart } from 'react-icons/fa';

import './BasketWidget.css';

export default function BasketWidget() {
  return (
    <div className='basket-widget-col-25'>
      <div className='basket-widget-container'>
        <h4>
          Cart{' '}
          <span className='price'>
            <FaShoppingCart />
            <b></b>
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
          <tbody className='basket-widget-table-body'></tbody>
        </table>
        <hr className='basket-widget' />
        <strong>Total Price:</strong> £<span id='total-price'>00.00</span>
      </div>
    </div>
  );
}
