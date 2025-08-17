import NavBar from '../components/Navbar/NavBar';
import LoginForm from '../components/LoginForm/LoginForm';
import Footer from '../components/Footer/Footer.jsx';

export default function LoginPage() {
  return (
    <div className='bg-slate-900 min-h-screen font-inter flex flex-col'>
      <NavBar />
      <main className='flex-grow pt-16'>
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
