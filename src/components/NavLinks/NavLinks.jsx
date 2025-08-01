import { NavLink } from 'react-router';
import { useState } from 'react';

export default function NavLinks() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className='flex items-center space-x-2'>
      <NavLink
        to='/basket'
        className='basket bg-purple-700 text-white text-3xl px-4 py-3 rounded-none outline-none border-none hover:bg-purple-500 transition'
      >
        <i className='fa-solid fa-shopping-basket' />
      </NavLink>
      <NavLink
        to='/login'
        className='user text-white text-3xl px-4 py-3 rounded-none outline-none border-none hover:bg-[#a9a9a941] transition'
      >
        <i className='fa-solid fa-user' />
      </NavLink>
      <NavLink
        to='/help'
        className='help text-white text-3xl px-4 py-3 rounded-none outline-none border-none relative hover:bg-[#a9a9a941] transition'
      >
        <i className='fa-solid fa-question' />
      </NavLink>
      {/* Genre Dropdown */}
      <div className='relative' onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
        <NavLink
          to='/categories'
          className='Genre text-white text-3xl px-4 py-3 rounded-none outline-none border-none hover:bg-[#a9a9a941] transition'
        >
          <i className='fa-solid fa-bars' />
        </NavLink>
        <div
          className={`dropdown-content absolute right-0 mt-2 bg-slate-950 shadow-lg rounded z-50 min-w-[180px] ${
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
              className='w-full text-left px-4 py-3 text-white bg-slate-950 border-none hover:bg-purple-500 transition'
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
