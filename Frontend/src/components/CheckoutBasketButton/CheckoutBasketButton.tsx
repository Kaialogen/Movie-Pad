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
    <button
      className='inline-block px-4 py-2 bg-purple-700 text-slate-50 font-inter rounded hover:bg-purple-500 cursor-pointer'
      onClick={proceedToCheckout}
    >
      Proceed to Checkout
    </button>
  );
}
