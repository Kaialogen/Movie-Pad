import SignoutButton from '../components/SignoutButton/SignoutButton.tsx';

export default function AccountPage() {
  return (
    <main className='flex-grow m-auto w-auto p-20'>
      <h1 className='text-center text-4xl font-bold mb-12 text-slate-50'>Account Page</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto'>
        <div className='lg:col-span-1 bg-slate-800 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold mb-6 text-slate-50'>Account Menu</h2>
          <p className='text-slate-200'>Order History</p>
          <p className='text-slate-200'>Account Settings</p>
          <SignoutButton />
        </div>
        <div className='lg:col-span-2 bg-slate-100 p-6 rounded-lg'>
          <h2 className='text-2xl font-bold mb-6 text-slate-900'>Order History</h2>
          <p className='text-slate-900'>This is where users can view their past orders and order details.</p>
        </div>
      </div>
    </main>
  );
}
