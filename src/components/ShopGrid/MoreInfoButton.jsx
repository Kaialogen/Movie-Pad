import { Link } from 'react-router';

export default function MoreInfoButton(props) {
  return (
    <Link className='MoreInfoButton' to={`/movie/${props.movieId}`}>
      More Info
    </Link>
  );
}
