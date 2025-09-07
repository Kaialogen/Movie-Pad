import { useNavigate } from 'react-router';

export default function HomepageButton() {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/');
  };

  return (
    <button
      className='bg-purple-700 text-slate-50 font-bold py-2 px-4 rounded-[8px] hover:bg-purple-500 cursor-pointer'
      onClick={goToHomepage}
    >
      Go to Homepage
    </button>
  );
}
