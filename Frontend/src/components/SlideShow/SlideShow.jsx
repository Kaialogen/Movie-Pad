import { useEffect, useState } from 'react';
import { slides } from './slides';

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
      <div className='max-w-[1800px] mx-auto relative mt-[80px]'>
        {slides.map((slide, index) => (
          <div key={index} className={`mySlides fade`} style={{ display: index === slideIndex ? 'block' : 'none' }}>
            <img className='w-[100%] h-[350px] m-5' src={slide.src} alt={slide.alt} />
            <div className='absolute top-[40px] left-[20px] max-w-[600px] bg-slate-900/90 p-4 rounded-2xl pl-5 pr-5 ml-5'>
              <h4 className='text-slate-50 text-2xl text-center font-inter pb-[20px]'>Welcome to Moviepad!</h4>
              <p className='text-slate-50 font-inter'>{paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
