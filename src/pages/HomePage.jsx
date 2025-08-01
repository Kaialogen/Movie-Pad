import NavBar from '../components/NavBar/NavBar.jsx';
import SlideShow from '../components/SlideShow/SlideShow.jsx';
import ShopGrid from '../components/ShopGrid/ShopGrid.jsx';

function HomePage() {
  return (
    <div className='bg-slate-900 min-h-full text-slate-50 font-inter'>
      <NavBar />
      <SlideShow />
      <ShopGrid />
    </div>
  );
}

export default HomePage;
