import { Link } from 'react-router';

export default function HomeButton() {
  return (
    <Link to='/' className=' text-white bg-transparent font-sans cursor-pointer'>
      <img
        src='images/FullName.png'
        className='inline-block relative left-1/2 -translate-x-1/2'
        width={180}
        height={44}
        alt='Home Button'
      />
    </Link>
  );
}
