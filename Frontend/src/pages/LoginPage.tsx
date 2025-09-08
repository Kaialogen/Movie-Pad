import LoginForm from '../components/LoginForm/LoginForm.tsx';

export default function LoginPage() {
  return (
    <main className='flex-grow pt-16'>
      <article className='w-auto m-auto p-12'>
        <h1 className='text-center text-4xl font-bold mb-12 pb-5 pt-10 text-slate-50'>
          Welcome To Endless Entertainment
        </h1>
        <LoginForm Route={'/'} />
      </article>
    </main>
  );
}
