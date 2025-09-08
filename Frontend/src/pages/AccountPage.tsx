import AccountSettingsCard from '../components/AccountSettingsCard/AccountSettingsCard.tsx';
import OrderHistoryCard from '../components/OrderHistoryCard/OrderHistoryCard.tsx';
import AccountMenuNavbar from '../components/AccountMenuNavbar/AccountMenuNavbar.tsx';

export default function AccountPage() {
  return (
    <main className='flex-grow m-auto w-auto p-20'>
      <h1 className='text-center text-4xl font-bold mb-12 text-slate-50'>Account Page</h1>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto'>
        <AccountMenuNavbar />
        <AccountSettingsCard />
      </div>
    </main>
  );
}
