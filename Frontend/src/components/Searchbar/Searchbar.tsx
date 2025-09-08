import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function Searchbar() {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  // Function to handle form submission
  interface MovieMap {
    [keyword: string]: number;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    // Use an object to map movie keywords to their IDs
    const movieMap: MovieMap = {
      paw: 2,
      patrol: 2,
      demon: 7,
      shang: 1,
      legend: 1,
      dog: 8,
      power: 8,
      bat: 5,
      dark: 5,
      knight: 5,
      'spiderman 2': 9,
      'spiderman 3': 3,
      "don't": 4,
      breathe: 4,
      matrix: 6,
      'the matrix': 6,
      shrek: 11,
      bee: 12,
      movie: 12,
    };

    // Check if the input matches any keywords
    const id: number | undefined = movieMap[inputText];
    if (id) {
      navigate(`/movie/${id}`);
    } else {
      toast.error("We couldn't identify that movie in our catalogue");
    }
  };

  return (
    <form
      className='flex items-center border-2 border-purple-700 rounded-xl h-10 bg-white/5 focus-within:bg-white/10 transition
 w-full max-w-2xl px-3 focus-within:ring-2 focus-within:ring-purple-500
'
      method='post'
      onSubmit={handleSubmit}
      role='search'
    >
      <i className='fa fa-fw fa-search text-white mr-2' />
      <input
        className='flex-1 bg-transparent text-white placeholder-white outline-none border-none'
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Search'
      />
    </form>
  );
}
