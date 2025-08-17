import Searchbar from '../Searchbar/Searchbar';
import HomeButton from '../HomeButton/HomeButton';
import NavLinks from '../NavLinks/NavLinks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadFromStorage } from '../../store/basketSlice';

export default function NavBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);
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
          <div className='sm:hidden'>
            <button className='text-white focus:outline-none' aria-label='Open menu'>
              <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeWidth='2' strokeLinecap='round' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className='sm:hidden px-4 pb-2 pt-1 bg-slate-950'>
        <Searchbar />
      </div>
    </div>
  );
}
