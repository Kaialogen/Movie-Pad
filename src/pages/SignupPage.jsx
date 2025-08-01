import NavBar from '../components/Navbar/NavBar';
import SignupForm from '../components/SignupForm/SignupForm';

export default function SignupPage() {
  return (
    <div className='bg-slate-900 min-h-full font-inter'>
      <NavBar />
      <SignupForm />
    </div>
  );
}
