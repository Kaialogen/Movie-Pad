import { Link } from 'react-router';

import './NavBar.css';
import submitted from './search';

export default function NavBar() {
  // Function to handle mouse enter event for the dropdown
  const handleMouseEnter = () => {
    const dropdownContent = document.getElementById('dropdown-content');
    if (dropdownContent) {
      dropdownContent.style.display = 'block';
    }
  };
  // Function to handle mouse leave event for the dropdown
  const handleMouseLeave = () => {
    const dropdownContent = document.getElementById('dropdown-content');
    if (dropdownContent) {
      dropdownContent.style.display = 'none';
    }
  };

  return (
    <>
      <div className='topnav'>
        <nav>
          <Link to='/basket' className='basket'>
            <i className='fa-solid fa-shopping-basket' />
          </Link>
          <Link to='/login' className='user'>
            <i className='fa-solid fa-user' />
          </Link>
          <Link to='/help' className='help'>
            <i className='fa-solid fa-question' />
          </Link>
          <Link to='/categories' className='Genre' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <i className='fa-solid fa-bars' />
          </Link>
          <div className='homebtn'>
            <Link to='/' className='homebtn-btn'>
              <img src='images/FullName.png' className='logo' width={180} height={44} alt='Home Button' />
            </Link>
          </div>
          <form className='search-bar' method='post' onSubmit={submitted} role='search'>
            <i className='fa fa-fw fa-search search-icon' />
            <input className='search-text text-white' type='text' id='query' placeholder='Search' />
          </form>
        </nav>

        <div className='dropdown'>
          <div className='dropdown-content' id='dropdown-content'>
            <button>Action</button>
            <button>Adventure</button>
            <button>Animation</button>
            <button>Comedy</button>
            <button>Crime</button>
            <button>Drama</button>
            <button>Fantasy</button>
            <button>Horror</button>
            <button>Romance</button>
            <button>Science Fiction</button>
            <button>Thriller</button>
            <button>Western</button>
          </div>
        </div>
      </div>
    </>
  );
}
