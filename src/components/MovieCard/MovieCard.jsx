import AddToBasketButton from '../AddToBasketbutton/AddToBasketButton';
import MoreInfoButton from '../MoreInfoButton/MoreInfoButton';

export default function MovieCard({ movie, days, onDaysChange }) {
  return (
    <div key={movie.id} className='group relative w-full max-w-[500px] h-[650px] overflow-hidden rounded-xl shadow-lg'>
      <img
        src={movie.image}
        alt={movie.name}
        className='w-full h-full object-cover transition-opacity duration-300 ease-in group-hover:opacity-30'
      />

      {/* Hover Overlay */}
      <div
        className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in 
                   flex flex-col items-center justify-center px-4 text-center bg-black/70 overflow-y-auto'
      >
        <h3 className='text-white font-bold text-2xl mb-2'>{movie.name}</h3>
        <p className='text-white text-sm mb-2'>£{movie.price.toFixed(2)} per day</p>

        <label htmlFor={`days-${movie.id}`} className='text-white text-sm mb-1'>
          Days to Rent:
        </label>
        <input
          type='number'
          id={`days-${movie.id}`}
          name='days'
          min={1}
          max={30}
          value={days}
          onChange={onDaysChange}
          className='w-16 text-center rounded bg-white text-black mb-3 outline-none'
        />

        <div className='flex flex-col gap-2 mb-3 w-full px-4'>
          <AddToBasketButton movieId={movie.id} days={days} />
          <MoreInfoButton movieId={movie.id} />
        </div>

        <p className='text-white text-xs max-h-[100px] overflow-hidden'>{movie.description}</p>
      </div>
    </div>
  );
}
