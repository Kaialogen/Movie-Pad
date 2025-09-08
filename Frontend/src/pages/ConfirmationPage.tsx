import { useDispatch } from 'react-redux';
import { clearBasket } from '../store/basketSlice.ts';

export default function Confirmation() {
  const orderDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);

  const dispatch = useDispatch();
  dispatch(clearBasket());

  return (
    <main className='flex-grow m-auto w-auto p-20'>
      <h1 className='text-center text-2xl pb-5 pt-20 text-slate-50'>Thank You For Your Order!</h1>
      <div className='text-slate-900 rounded bg-slate-50 p-10'>
        <h2 className='text-center text-2xl'>Receipt</h2>
        <div id='payment-details' className='text-center'>
          <p className='details'>
            Date: {orderDate}
            <span id='payment-date' className='payment-date' />
          </p>
          <p className='details'>
            Order Reference:
            <span> # {random4DigitNumber}</span>
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
        </div>
      </div>
    </main>
  );
}
