import Searchbar from '../Searchbar/Searchbar';
import HomeButton from '../HomeButton/homeButton';
import NavLinks from '../NavLinks/NavLinks';

export default function NavBar() {
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
