import NavBar from '../components/Navbar/NavBar';
import SignupForm from '../components/SignupForm/SignupForm';
import Footer from '../components/Footer/Footer.jsx';

export default function SignupPage() {
  return (
    <div className='bg-slate-900 min-h-screen font-inter flex flex-col text-slate-50'>
      <NavBar />
      <SignupForm />
      <Footer />
    </div>
  );
}
