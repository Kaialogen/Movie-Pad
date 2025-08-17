import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className='backdrop-blur-md bg-white/5 border-t border-white/10 shadow-lg'>
      <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300'>
        {/* Left Column */}
        <div>
          <h2 className='text-xl font-bold text-white'>Moviepad</h2>
          <p className='mt-2 text-sm text-gray-400 leading-relaxed'>
            Moviepad is your go-to platform for renting and exploring the latest and greatest movies. Stream anytime,
            anywhere, and discover your next favourite film today.
          </p>
          <p className='mt-4 text-xs text-gray-500'>© {new Date().getFullYear()} Moviepad. All rights reserved.</p>
        </div>

        {/* Middle Column */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-3'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link to='/categories' className='hover:text-purple-400 transition'>
                Browse Categories
              </Link>
            </li>
            <li>
              <Link to='/help' className='hover:text-purple-400 transition'>
                Help & Support
              </Link>
            </li>
            <li>
              <Link to='/login' className='hover:text-purple-400 transition'>
                My Account
              </Link>
            </li>
            <li>
              <Link to='/terms' className='hover:text-purple-400 transition'>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-3'>Follow Us</h3>
          <div className='flex space-x-4 text-xl'>
            <a href='#' className='hover:text-purple-400 transition'>
              <FaFacebookF />
            </a>
            <a href='#' className='hover:text-purple-400 transition'>
              <FaTwitter />
            </a>
            <a href='#' className='hover:text-purple-400 transition'>
              <FaInstagram />
            </a>
            <a href='#' className='hover:text-purple-400 transition'>
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
