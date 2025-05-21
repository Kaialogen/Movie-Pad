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
          <a
            href='./Categories.html'
            className='Genre'
            onmouseover={(document.getElementById('dropdown-content').style.display = 'block')}
            onmouseleave={(document.getElementById('dropdown-content').style.display = 'none')}
            onfocus={(document.getElementById('dropdown-content').style.display = 'block')}
          >
            <i className='fa-solid fa-bars' />
          </a>
          <div className='homebtn'>
            <button className='homebtn-btn' onclick="location.href='/index.html';">
              <img src='images/FullName.png' className='logo' width={180} height={44} alt='Home Button' />
            </button>
          </div>
          <form className='search-bar' method='post' onsubmit={submitted} role='search'>
            <i className='fa fa-fw fa-search search-icon' />
            <input className='search-text text-white' type='text' id='query' placeholder='Search' />
          </form>
        </nav>

        <div
          className='dropdown'
          onmouseover={(document.getElementById('dropdown-content').style.display = 'block')}
          onmouseleave={(document.getElementById('dropdown-content').style.display = 'none')}
          onFocus={(document.getElementById('dropdown-content').style.display = 'block')}
        >
          <div className='dropdown-content' id='dropdown-content'>
            <button onclick='action()'>Action</button>
            <button onclick='adventure()'>Adventure</button>
            <button onclick='animation()'>Animation</button>
            <button onclick='comedy()'>Comedy</button>
            <button onclick='crime()'>Crime</button>
            <button onclick='drama()'>Drama</button>
            <button onclick='fantasy()'>Fantasy</button>
            <button onclick='horror()'>Horror</button>
            <button onclick='romance()'>Romance</button>
            <button onclick='scienceFiction()'>Science Fiction</button>
            <button onclick='thriller()'>Thriller</button>
            <button onclick='western()'>Western</button>
          </div>
        </div>
      </div>
    </>
  );
}
