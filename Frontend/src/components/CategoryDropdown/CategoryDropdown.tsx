import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { Menu } from 'lucide-react';

const genres: string[] = [
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
];

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey: (e: KeyboardEvent) => void = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className='relative flex items-center' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink
        to='/categories'
        className={({ isActive }) =>
          `relative flex items-center justify-center h-16 w-14 text-2xl transition 
     ${isActive ? 'text-purple-400 after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-purple-400' : 'text-white hover:text-purple-300'}`
        }
        aria-haspopup='true'
        aria-expanded={open}
      >
        <Menu className='text-2xl' />
      </NavLink>

      {open && (
        <div
          className='
            fixed top-16 right-4 z-50
            w-[480px] max-w-[92vw]
            rounded-2xl shadow-xl
            bg-white/10 backdrop-blur-md border border-white/20
            text-white
          '
          role='menu'
        >
          <div className='grid grid-cols-2 gap-1 p-4'>
            <div className='col-span-2 text-center pb-2 mb-2 border-b border-white/10'>
              <h3 className='text-sm font-semibold tracking-wider uppercase text-gray-200'>Categories</h3>
            </div>

            {genres.map((g) => (
              <button
                key={g}
                className='
                  text-left px-3 py-2 rounded-lg
                  hover:bg-white/10 transition
                  focus:outline-none focus:ring-2 focus:ring-white/30
                '
                role='menuitem'
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
