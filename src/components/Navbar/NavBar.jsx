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
    <div className='fixed top-0 w-full z-10 bg-slate-950 shadow-md h-16'>
      <nav className='flex items-center justify-between px-4'>
        <HomeButton />
        <Searchbar />
        <NavLinks />
      </nav>
    </div>
  );
}
