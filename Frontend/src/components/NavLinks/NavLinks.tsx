import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';
import { CircleUser, CircleQuestionMark, ShoppingBasket } from 'lucide-react';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.tsx';

export default function NavLinks() {
  const basketCount = useSelector((state: any) => state.basket.basket.length);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <div className='flex items-center space-x-2'>
      <NavLink
        to={loggedIn ? '/account' : '/login'}
        className={({ isActive }) =>
          `relative flex items-center justify-center h-16 px-4 text-sm md:text-base transition 
     ${isActive ? 'text-purple-400 after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-purple-400' : 'text-white hover:text-purple-300'}`
        }
      >
        {loggedIn ? <span className='truncate'>{username}</span> : <CircleUser className='text-2xl' />}
      </NavLink>

      <NavLink
        to='/help'
        className={({ isActive }) =>
          `relative flex items-center justify-center h-16 w-14 text-2xl transition 
     ${isActive ? 'text-purple-400 after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-purple-400' : 'text-white hover:text-purple-300'}`
        }
        aria-label='Help'
      >
        <CircleQuestionMark className='text-2xl' />
      </NavLink>
      <CategoryDropdown />

      <NavLink
        to='/basket'
        className='relative flex items-center justify-center h-16 w-14 bg-purple-700 text-white text-2xl hover:bg-purple-600 transition'
        aria-label='Basket'
      >
        <ShoppingBasket className='text-2xl' />
        {basketCount > 0 && (
          <span className='absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1'>
            {basketCount}
          </span>
        )}
      </NavLink>
    </div>
  );
}
