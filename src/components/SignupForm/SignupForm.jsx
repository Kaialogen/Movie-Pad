import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

export default function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function validateEmail(email) {
    return /^[A-Za-z0-9]+([.-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    alert('Form submitted');
    navigate('/');
  }
  return (
    <div className='absolute w-full p-12'>
      <article>
        <h1 className='text-center text-2xl pb-5 pt-10 text-slate-50'>Welcome To Endless Entertainment</h1>
        <div className='bg-slate-100 w-1/2 mx-auto p-8 rounded-3xl space-y-8'>
          <h2 className='text-center text-2xl pb-5 pt-4 text-slate-900'>Sign Up</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='username' className='text-slate-900 block'>
                Username:
              </label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Create a Username...'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-slate-900 block'>
                Email Address:
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your Email Address...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='password' className='text-slate-900 block'>
                Password:
              </label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Create a Password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='confirm-password' className='text-slate-900 block'>
                Confirm Password:
              </label>
              <input
                type='password'
                id='confirm-password'
                name='confirm-password'
                placeholder='Confirm your Password...'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
                required
              />
            </div>
            <div>
              <button
                type='submit'
                className='bg-purple-700 text-slate-50 font-inter rounded-[8px] px-4 py-2 hover:bg-purple-500 w-1/4 mt-2 justify-center mx-auto block'
              >
                Sign Up
              </button>
              <Link
                to='/login'
                className='text-slate-900 hover:text-slate-500 text-center pt-2.5 justify-center mx-auto block'
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}
