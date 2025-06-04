import { useNavigate } from 'react-router';

export default function CheckoutBasketButton() {
  const navigate = useNavigate();

  // Function to proceed to checkout
  const proceedToCheckout = () => {
    const basket = JSON.parse(sessionStorage.getItem('basket') ?? '[]');
    if (basket.length === 0) {
      alert('Basket is empty');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <button className='btn pay' onClick={proceedToCheckout}>
      Proceed to Checkout
    </button>
  );
}
