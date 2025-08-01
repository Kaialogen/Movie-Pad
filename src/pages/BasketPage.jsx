import NavBar from '../components/NavBar/NavBar';
import Basket from '../components/Basket/Basket';

export default function BasketPage() {
  return (
    <div className='bg-slate-900 min-h-full text-slate-50 font-inter'>
      <NavBar />
      <Basket />
    </div>
  );
}
