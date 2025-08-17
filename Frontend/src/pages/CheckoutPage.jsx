import Navbar from '../components/Navbar/NavBar';
import BasketWidget from '../components/BasketWidget/BasketWidget';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className='bg-slate-900 min-h-screen text-slate-50 font-inter'>
      <Navbar />
      <h1 className='text-center text-4xl font-bold mb-12 pt-20 text-slate-50'>Checkout</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto'>
        <div className='lg:col-span-2'>
          <CheckoutForm />
        </div>
        <div className='lg:col-span-1'>
          <BasketWidget />
        </div>
      </div>
    </div>
  );
}
