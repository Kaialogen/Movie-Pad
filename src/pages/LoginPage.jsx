import NavBar from '../components/Navbar/NavBar';
import LoginForm from '../components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div className='bg-slate-900 min-h-full font-inter'>
      <NavBar />
      <LoginForm />
    </div>
  );
}
