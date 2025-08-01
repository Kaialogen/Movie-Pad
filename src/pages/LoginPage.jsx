import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

import NavBar from '../components/NavBar/NavBar';

import './LoginPage.css';

export default function LoginPage() {
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
    <>
      <NavBar />
      <div className='login'>
        <article>
          <h1>Welcome To Endless Entertainment</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='email'>Please Enter your Details</label>
              <br />
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div>
                <button type='submit'>Log In</button>
                <br />
                <br />
                <Link to='/signup'>Don't have an account?</Link>
              </div>
            </form>
          </div>
        </article>
      </div>
    </>
  );
}
