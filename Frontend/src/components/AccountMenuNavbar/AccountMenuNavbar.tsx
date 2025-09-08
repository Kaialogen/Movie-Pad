import { CircleUser, ShoppingBasket } from 'lucide-react';

import SignoutButton from '../SignoutButton/SignoutButton.tsx';

export default function AccountMenuNavbar() {
  return (
    <div className='lg:col-span-1 bg-slate-800 p-6 rounded-lg'>
      <h2 className='text-2xl font-bold mb-6 text-slate-50'>Account Menu</h2>
      <div className='flex flex-col gap-4 mb-6'>
        <div className='flex items-center gap-2 text-slate-200'>
          <ShoppingBasket />
          <span>Order History</span>
        </div>
        <div className='flex items-center gap-2 text-slate-200'>
          <CircleUser />
          <span>Account Settings</span>
        </div>
        <SignoutButton />
      </div>
    </div>
  );
}
