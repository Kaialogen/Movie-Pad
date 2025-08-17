import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';

export default function NavLinks() {
  const basketCount = useSelector((state) => state.basket.basket.length);

  return (
    <div className='flex items-center space-x-2'>
      <NavLink
        to='/login'
        className={({ isActive }) =>
          `relative flex items-center justify-center h-16 w-14 text-2xl transition 
     ${isActive ? 'text-purple-400 after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-purple-400' : 'text-white hover:text-purple-300'}`
        }
      >
        <i className='fa-solid fa-user' />
      </NavLink>

      <NavLink
        to='/help'
        className={({ isActive }) =>
          `relative flex items-center justify-center h-16 w-14 text-2xl transition 
     ${isActive ? 'text-purple-400 after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-purple-400' : 'text-white hover:text-purple-300'}`
        }
        aria-label='Help'
      >
        <i className='fa-solid fa-question' />
      </NavLink>

      <CategoryDropdown />

      <NavLink
        to='/basket'
        className='relative flex items-center justify-center h-16 w-14 bg-purple-700 text-white text-2xl hover:bg-purple-600 transition'
        aria-label='Basket'
      >
        <i className='fa-solid fa-shopping-basket' />
        {basketCount > 0 && (
          <span className='absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1'>
            {basketCount}
          </span>
        )}
      </NavLink>
    </div>
  );
}
