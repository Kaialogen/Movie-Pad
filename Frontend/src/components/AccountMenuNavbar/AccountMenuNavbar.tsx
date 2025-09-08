import { CircleUser, ShoppingBasket } from 'lucide-react';
import SignoutButton from '../SignoutButton/SignoutButton.tsx';

type Props = {
  setSelectedPanel: (panel: 'settings' | 'orders') => void;
  selectedPanel: 'settings' | 'orders';
};

export default function AccountMenuNavbar({ setSelectedPanel, selectedPanel }: Props) {
  return (
    <div className='lg:col-span-1 bg-slate-800 p-6 rounded-lg'>
      <h2 className='text-2xl font-bold mb-6 text-slate-50'>Account Menu</h2>
      <div className='flex flex-col gap-4 mb-6'>
        {/* Order History */}
        <button
          onClick={() => setSelectedPanel('orders')}
          className={`flex items-center gap-2 p-2 rounded-md ${
            selectedPanel === 'orders' ? 'bg-slate-700 text-white' : 'text-slate-200 hover:bg-slate-700'
          }`}
        >
          <ShoppingBasket />
          <span>Order History</span>
        </button>

        {/* Account Settings */}
        <button
          onClick={() => setSelectedPanel('settings')}
          className={`flex items-center gap-2 p-2 rounded-md ${
            selectedPanel === 'settings' ? 'bg-slate-700 text-white' : 'text-slate-200 hover:bg-slate-700'
          }`}
        >
          <CircleUser />
          <span>Account Settings</span>
        </button>

        <SignoutButton />
      </div>
    </div>
  );
}
