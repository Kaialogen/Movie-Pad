import { Link } from 'react-router';

import './NavBar.css';
import submitted from './search';

export default function NavBar() {
  return (
    <>
      <div className='topnav'>
        <nav>
          <a href='/basket.html' className='basket'>
            <i className='fa-solid fa-shopping-basket' />
          </a>
          <a href='/login.html' className='user'>
            <i className='fa-solid fa-user' />
          </a>
          <a href='/help.html' className='help'>
            <i className='fa-solid fa-question' />
          </a>
          <Link to='/categories' className='Genre'>
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
            {/*
            <button onClick='action()'>Action</button>
            <button onClick='adventure()'>Adventure</button>
            <button onClick='animation()'>Animation</button>
            <button onClick='comedy()'>Comedy</button>
            <button onClick='crime()'>Crime</button>
            <button onClick='drama()'>Drama</button>
            <button onClick='fantasy()'>Fantasy</button>
            <button onClick='horror()'>Horror</button>
            <button onClick='romance()'>Romance</button>
            <button onClick='scienceFiction()'>Science Fiction</button>
            <button onClick='thriller()'>Thriller</button>
            <button onClick='western()'>Western</button>
            */}
          </div>
        </div>
      </div>
    </>
  );
}
