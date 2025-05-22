import NavBar from '../components/NavBar/NavBar';
import './CategoriesPage.css';

export default function CategoriesPage() {
  return (
    <>
      <NavBar />
      <div className='categories'>
        <h1>Categories</h1>
        <p>Click on a category to view the movies available.</p>
        <div className='categories-grid'>
          <a href='#' className='category-item'>
            <img src='images/Action.jpg' alt='Action' />
            <h2>Action</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Adventure.jpg' alt='Adventure' />
            <h2>Adventure</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Animation.jpg' alt='Animation' />
            <h2>Animation</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Comedy.jpg' alt='Comedy' />
            <h2>Comedy</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Crime.jpg' alt='Crime' />
            <h2>Crime</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Drama.jpg' alt='Drama' />
            <h2>Drama</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Fantasy.jpg' alt='Fantasy' />
            <h2>Fantasy</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Horror.jpg' alt='Horror' />
            <h2>Horror</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Romance.jpg' alt='Romance' />
            <h2>Romance</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/ScienceFiction.jpg' alt='Science Fiction' />
            <h2>Science Fiction</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Thriller.jpg' alt='Thriller' />
            <h2>Thriller</h2>
          </a>
          <a href='#' className='category-item'>
            <img src='images/Western.jpg' alt='Western' />
            <h2>Western</h2>
          </a>
        </div>
      </div>
    </>
  );
}
