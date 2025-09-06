import { Link } from 'react-router';

type MoreInfoButtonProps = {
  movieId: string | number;
};

export default function MoreInfoButton({ movieId }: MoreInfoButtonProps) {
  return (
    <Link
      to={`/movie/${movieId}`}
      className='inline-block px-4 py-2 bg-purple-700 text-slate-50 font-inter rounded-[8px] hover:bg-purple-500'
      role='button'
      tabIndex={0}
    >
      More Info
    </Link>
  );
}
