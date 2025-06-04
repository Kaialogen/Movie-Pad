import Navbar from '../components/Navbar/NavBar';
import BasketWidget from '../components/BasketWidget/BasketWidget';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

import './CheckoutPage.css';

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <div className='order-main'>
        <h1 className='checkout-title'>Checkout</h1>
        <div className='checkout-row'></div>
        <CheckoutForm />
        <BasketWidget />
      </div>
    </>
  );
}
