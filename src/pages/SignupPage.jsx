import { Link, useNavigate } from 'react-router';
import { useState } from 'react';

import NavBar from '../components/NavBar/NavBar';

import './SignupPage.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function validateEmail(email) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
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
    <>
      <NavBar />
      <div className='signup-main'>
        <article>
          <h1>Welcome To Endless Entertainment</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <p>Please Enter your Details</p>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Create a Username...'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your Email Address...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Create a Password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor='confirm-password'>Confirm Password</label>
              <input
                type='password'
                id='confirm-password'
                name='confirm-password'
                placeholder='Confirm your Password...'
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              <div>
                <button type='submit'>Sign Up</button>
                <br />
                <br />
                <Link to='/login'>Already have an account?</Link>
              </div>
            </form>
          </div>
        </article>
      </div>
    </>
  );
}
