import NavBar from '../components/Navbar/NavBar';
import Basket from '../components/Basket/Basket';
import Footer from '../components/Footer/Footer';

export default function BasketPage() {
  return (
    <div className='bg-slate-900 min-h-screen text-slate-50 font-inter flex flex-col'>
      <NavBar />
      <Basket />
      <Footer />
    </div>
  );
}
