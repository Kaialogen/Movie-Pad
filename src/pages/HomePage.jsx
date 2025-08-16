import NavBar from '../components/Navbar/NavBar.jsx';
import SlideShow from '../components/SlideShow/SlideShow.jsx';
import ShopGrid from '../components/ShopGrid/ShopGrid.jsx';
import { Toaster } from '../components/ui/sonner';

function HomePage() {
  return (
    <div className='bg-slate-900 min-h-full text-slate-50 font-inter'>
      <Toaster richColors position='top-center' />
      <NavBar />
      <SlideShow />
      <ShopGrid />
    </div>
  );
}

export default HomePage;
