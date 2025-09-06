import { Outlet } from 'react-router';
import NavBar from './components/Navbar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Toaster } from './components/ui/sonner.js';

export default function MainLayout() {
  return (
    <div className='bg-slate-900 min-h-screen font-inter flex flex-col'>
      <NavBar />
      <Toaster richColors position='top-center' />
      <Outlet />
      <Footer />
    </div>
  );
}
