import { Link } from 'react-router';

export default function CheckoutBasketButton() {
  // Function to proceed to checkout
  const proceedToCheckout = () => {
    const basket = JSON.parse(sessionStorage.getItem('basket') ?? '[]');
    if (basket.length === 0) {
      alert('Basket is empty');
    } else {
      <Link to='/checkout' className='btn pay'>
        Proceed to Checkout
      </Link>;
    }
  };

  return (
    <button className='btn pay' onClick={proceedToCheckout}>
      Proceed to Checkout
    </button>
  );
}
