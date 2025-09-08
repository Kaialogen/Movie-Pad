import BasketWidget from '../components/BasketWidget/BasketWidget.tsx';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm.tsx';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);
  return loggedIn ? (
    <main className='flex-grow pt-20'>
      <h1 className='text-center text-4xl font-bold mb-12 text-slate-50'>Checkout</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto'>
        <div className='lg:col-span-2'>
          <CheckoutForm />
        </div>
        <div className='lg:col-span-1'>
          <BasketWidget />
        </div>
      </div>
    </main>
  ) : (
    <main className='flex-grow pt-20'>
      <h1 className='text-center text-4xl font-bold mb-12 text-slate-50'>Please log in to proceed to checkout.</h1>
    </main>
  );
}
