import { useState } from 'react';
import { toast } from 'sonner';

export default function UpdateUsername() {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/user/update-username', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername: username }),
      });
      if (response.ok) {
        toast.success('Username updated successfully!');
        setUsername('');
      } else {
        toast.error('Failed to update username. Please try again.');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='bg-slate-300 mb-4 text-center rounded-lg p-4'>
      <p className='text-xl mb-4'>Update Username</p>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='space-y-2'>
          <input
            type='username'
            name='username'
            placeholder='New Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-3/4 px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700 bg-slate-100'
            required
          />
        </div>
        <div className='pt-2 space-y-2'>
          <button
            type='submit'
            className='bg-purple-700 text-slate-50 rounded-[8px] px-4 py-2 hover:bg-purple-500 w-1/2 mt-2 justify-center mx-auto block cursor-pointer'
          >
            Update Username
          </button>
        </div>
      </form>
    </div>
  );
}
