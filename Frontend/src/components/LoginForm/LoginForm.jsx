import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateEmail(email) {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log('Logging in with:', { email, password });
    navigate('/'); // Redirect to home page after login
  }
  return (
    <article className='w-auto m-auto p-12'>
      <h1 className='text-center text-4xl font-bold mb-12 pb-5 pt-10 text-slate-50'>
        Welcome To Endless Entertainment
      </h1>
      <div className='bg-slate-100 w-1/2 mx-auto p-8 rounded-3xl space-y-8'>
        <h2 className='text-center text-2xl pb-5 pt-4 text-slate-900'>Log In</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label htmlFor='email' className='text-slate-900 block'>
              Please Enter your Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
              required
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='password' className='text-slate-900 block'>
              Please Enter your Password:
            </label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700'
              required
            />
          </div>
          <div className='pt-2 space-y-2'>
            <button
              type='submit'
              className='bg-purple-700 text-slate-50 font-inter rounded-[8px] px-4 py-2 hover:bg-purple-500 w-1/4 mt-2 justify-center mx-auto block'
            >
              Log In
            </button>
            <Link
              to='/signup'
              className='text-slate-900 hover:text-slate-500 text-center pt-2.5 justify-center mx-auto block'
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </article>
  );
}
