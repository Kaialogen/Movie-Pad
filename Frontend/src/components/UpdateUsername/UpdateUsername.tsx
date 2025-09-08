export default function UpdateUsername() {
  return (
    <div className='bg-slate-300 mb-4 text-center rounded-lg p-4'>
      <p className='text-xl mb-4'>Update Username</p>
      <form className='space-y-6'>
        <div className='space-y-2'>
          <input
            type='username'
            name='username'
            placeholder='New Username'
            className='w-3/4 px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700 bg-slate-100'
            required
          />
        </div>
        <div className='pt-2 space-y-2'>
          <button
            type='submit'
            className='bg-purple-700 text-slate-50 rounded-[8px] px-4 py-2 hover:bg-purple-500 w-1/2 mt-2 justify-center mx-auto block cursor-pointer'
          >
            Update Username
          </button>
        </div>
      </form>
    </div>
  );
}
