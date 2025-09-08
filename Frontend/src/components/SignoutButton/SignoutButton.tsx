import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function SignoutButton() {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Logged out successfully.');
        navigate('/');
      } else {
        toast.error('Logout failed.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };
  return (
    <button
      className='bg-purple-700 text-slate-50 rounded-[8px] px-4 py-2 hover:bg-purple-500 w-1/2 mt-2 justify-center mx-auto block cursor-pointer'
      onClick={signOut}
    >
      Sign Out
    </button>
  );
}
