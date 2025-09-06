import { useEffect, useState } from 'react';
import { slides } from './slides.ts';

export default function SlideShow() {
  const paragraph =
    'Welcome to Moviepad - the ultimate destination for movie lovers! With our extensive collection of movies spanning different genres, we have something for everyone. Rent your favorite movies at the click of a button and enjoy them at your own convenience. Happy watching!';

  const [slideIndex, setSlideIndex] = useState(0);

  interface Slide {
    src: string;
    alt: string;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div className='flex justify-center mt-20'>
        <div className='w-full max-w-[1800px] relative px-4'>
          {slides.map((slide: Slide, index: number) => (
            <div key={index} className='mySlides fade' style={{ display: index === slideIndex ? 'block' : 'none' }}>
              <img className='w-full h-[350px] rounded-xl' src={slide.src} alt={slide.alt} />
              <div className='absolute top-[40px] left-[20px] max-w-[600px] bg-slate-900/90 p-4 rounded-2xl pl-5 pr-5 ml-5 font-inter'>
                <h4 className='text-slate-50 text-2xl text-center pb-[20px]'>Welcome to Moviepad!</h4>
                <p className='text-slate-50'>{paragraph}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
