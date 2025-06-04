export default function MoreInfoButton(props) {
  return (
    <button className='MoreInfoButton' onClick={() => alert('More information about the movie: ' + props.movieId)}>
      More Info
    </button>
  );
}
