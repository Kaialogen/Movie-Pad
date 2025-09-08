import { useNavigate } from 'react-router';

export default function DeleteAccount() {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/delete-account', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to delete account. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  return (
    <div className='bg-slate-300 text-center p-4 rounded-lg p-4'>
      <p className='text-xl mb-4'>Delete Account</p>
      <button
        className='bg-red-700 text-slate-50 rounded-[8px] px-4 py-2 hover:bg-red-500 w-1/2 mt-2 justify-center mx-auto block cursor-pointer'
        onClick={handleDelete}
      >
        Delete Account
      </button>
    </div>
  );
}
