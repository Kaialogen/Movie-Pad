import { Outlet } from 'react-router';
import NavBar from './components/Navbar/NavBar.tsx';
import Footer from './components/Footer/Footer.tsx';
import { Toaster } from './components/ui/sonner.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadFromStorage } from './store/basketSlice.ts';

export default function MainLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);
  return (
    <div className='bg-slate-900 min-h-screen font-inter flex flex-col'>
      <NavBar />
      <Toaster richColors position='top-center' />
      <Outlet />
      <Footer />
    </div>
  );
}
