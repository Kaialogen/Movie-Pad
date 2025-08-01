import { Link } from 'react-router';
import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className='fixed top-0 w-full z-10 bg-[#1b2530] shadow-md'>
      <nav className='flex items-center justify-between px-4'>
        {/* Left: Home Button */}
        <div className='flex items-center'>
          <div className='relative left-2 top-3'>
            <Link to='/' className='homebtn-btn text-white bg-transparent font-sans cursor-pointer'>
              <img
                src='images/FullName.png'
                className='inline-block relative left-1/2 -translate-x-1/2'
                width={180}
                height={44}
                alt='Home Button'
              />
            </Link>
          </div>
        </div>

        <Searchbar />

        {/* Right: Nav Links */}
        <div className='flex items-center space-x-2'>
          <Link
            to='/basket'
            className='basket bg-purple-700 text-white text-3xl px-4 py-3 rounded-none outline-none border-none hover:bg-purple-500 transition'
          >
            <i className='fa-solid fa-shopping-basket' />
          </Link>
          <Link
            to='/login'
            className='user text-white text-3xl px-4 py-3 rounded-none outline-none border-none hover:bg-[#a9a9a941] transition'
          >
            <i className='fa-solid fa-user' />
          </Link>
          <Link
            to='/help'
            className='help text-white text-3xl px-4 py-3 rounded-none outline-none border-none relative hover:bg-[#a9a9a941] transition'
          >
            <i className='fa-solid fa-question' />
          </Link>
          {/* Genre Dropdown */}
          <div
            className='relative'
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              to='/categories'
              className='Genre text-white text-3xl px-4 py-3 rounded-none outline-none border-none hover:bg-[#a9a9a941] transition'
            >
              <i className='fa-solid fa-bars' />
            </Link>
            <div
              className={`dropdown-content absolute right-0 mt-2 bg-[#1b2530] shadow-lg rounded z-50 min-w-[180px] ${
                dropdownOpen ? 'block' : 'hidden'
              }`}
            >
              {[
                'Action',
                'Adventure',
                'Animation',
                'Comedy',
                'Crime',
                'Drama',
                'Fantasy',
                'Horror',
                'Romance',
                'Science Fiction',
                'Thriller',
                'Western',
              ].map((genre) => (
                <button
                  key={genre}
                  className='w-full text-left px-4 py-3 text-white bg-[#1b2530] border-none hover:bg-[#a9a9a941] transition'
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
