import { useEffect, useState } from 'react';
import { slides } from './slides';
import './SlideShow.css';

export default function SlideShow() {
  const paragraph =
    'Welcome to Moviepad - the ultimate destination for movie lovers! With our extensive collection of movies spanning different genres, we have something for everyone. Rent your favorite movies at the click of a button and enjoy them at your own convenience. Happy watching!';

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div className='slideshow-container'>
        {slides.map((slide, index) => (
          <div key={index} className={`mySlides fade`} style={{ display: index === slideIndex ? 'block' : 'none' }}>
            <div className='numbertext'>
              <img className='image-scaling' src={slide.src} alt={slide.alt} />
              <div className='text-block'>
                <h4>Welcome to Moviepad</h4>
                <p>{paragraph}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
