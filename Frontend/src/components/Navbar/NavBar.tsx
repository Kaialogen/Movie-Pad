import Searchbar from '../Searchbar/Searchbar.tsx';
import HomeButton from '../HomeButton/HomeButton.tsx';
import NavLinks from '../NavLinks/NavLinks.tsx';
import { Menu } from 'lucide-react';

export default function NavBar() {
  return (
    <div
      className='fixed top-0 w-full z-10 bg-slate-900/80 backdrop-blur-md border-b border-white/10
 h-16'
    >
      <nav className='flex items-center justify-between pl-4 h-full'>
        <div className='flex items-center'>
          <HomeButton />
        </div>
        <div className='flex-1 flex justify-center mx-4 max-w-xs w-full'>
          <div className='hidden sm:block w-full'>
            <Searchbar />
          </div>
        </div>
        <div className='flex items-center'>
          <div className='hidden sm:flex'>
            <NavLinks />
          </div>
          {
            // menu for small screens
          }
          <div className='sm:hidden'>
            <Menu className='text-white text-2xl cursor-pointer' />
          </div>
        </div>
      </nav>
      <div className='sm:hidden px-4 pb-2 pt-1 bg-slate-950'>
        <Searchbar />
      </div>
    </div>
  );
}
