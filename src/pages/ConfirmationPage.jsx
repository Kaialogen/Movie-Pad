import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar/NavBar';

import './ConfirmationPage.css';

export default function Confirmation() {
  const orderDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);

  const basket = useSelector((state) => state.basket.basket);

  const totalPrice = basket.reduce((sum, item) => sum + item.price * item.rentDays, 0).toFixed(2);

  return (
    <>
      <NavBar />;
      <div className='invoice'>
        <article>
          <h1 className='invoice-title'>Thank You For Your Order!</h1>
          <div className='invoice-container'>
            <h2 className='invoice-header'>Receipt</h2>
            <div id='payment-details' className='payment-details'>
              <p className='details'>
                Date: {orderDate}
                <span id='payment-date' className='payment-date' />
              </p>
              <p className='details'>
                Order Reference:
                <span> # {random4DigitNumber}</span>
                <span id='payment-order-ref-1' />
                <span id='payment-order-ref-2' />
                <span id='payment-order-ref-3' />
                <span id='payment-order-ref-4' />
              </p>
              <p className='info'>
                <span id='payment-details-title' className='payment-detail' />
                <span id='fname' className='payment-detail' /> <span id='lname' className='payment-detail' />
                <span id='email' className='payment-detail' />
              </p>
              <p className='info'>
                <span id='adr' className='payment-detail' /> <span id='city' className='payment-detail' />
                <span id='county' className='payment-detail' />
                <span id='postcode' className='payment-detail' />
              </p>
              <p className='payment-info'>
                <span id='payment-details-card' className='payment-detail' />
                <span id='payment-details-cardNumber' className='payment-detail' />
              </p>
              <br />
              <div className='invoice-table'>
                <table style={{ width: '90%' }}>
                  <thead>
                    <tr style={{ textAlign: 'left' }}>
                      <th>Movie</th>
                      <th>Days</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: 'left' }} id='basket'>
                    {basket.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.rentDays}</td>
                        <td>£{(item.price * item.rentDays).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                <div style={{ textAlign: 'left' }}>
                  <strong>Total Price:</strong> £<span id='total-price'>{totalPrice}</span>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
