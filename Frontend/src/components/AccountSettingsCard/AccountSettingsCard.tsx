import UpdateUsername from '../UpdateUsername/UpdateUsername.tsx';
import UpdatePassword from '../UpdatePassword/UpdatePassword.tsx';
import DeleteAccount from '../DeleteAccount/DeleteAccount.tsx';

export default function AccountSettingsCard() {
  return (
    <div className='lg:col-span-2 bg-slate-100 p-6 rounded-lg'>
      <h2 className='text-center text-2xl pb-5 pt-4 text-slate-900 text-bold'>Account Settings</h2>
      <UpdateUsername />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  );
}
