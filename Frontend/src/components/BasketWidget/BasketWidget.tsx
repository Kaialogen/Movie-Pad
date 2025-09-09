import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';

interface BasketItem {
  id: number;
  name: string;
  price: number;
  rentDays: number;
}

export default function BasketWidget() {
  const basket = useSelector((state: any) => state.basket.basket);
  const totalPrice = basket.reduce((sum: number, item: BasketItem) => sum + item.price * item.rentDays, 0).toFixed(2);

  return (
    <aside className='w-9/12'>
      <div className='bg-slate-100 rounded-xl shadow-md p-6 text-slate-900'>
        <h4 className='text-lg font-semibold flex items-center justify-between border-b pb-3 mb-4'>
          <span className='text-2xl font-semibold mb-4 text-purple-700'>Cart</span>
          <span className='flex items-center gap-2 text-purple-700'>
            <ShoppingCart className='text-xl' />
            <b>{basket.length}</b>
          </span>
        </h4>

        {basket.length > 0 ? (
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='border-b text-slate-600'>
                <th className='pb-2'>Movie</th>
                <th className='pb-2'>Days</th>
                <th className='pb-2'>Price</th>
              </tr>
            </thead>
            <tbody>
              {basket.map((item: BasketItem) => (
                <tr key={item.id} className='hover:bg-slate-100 transition'>
                  <td className='py-2'>{item.name}</td>
                  <td className='py-2'>{item.rentDays}</td>
                  <td className='py-2'>£{(item.price * item.rentDays).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-slate-500 italic text-sm'>Your basket is empty.</p>
        )}

        <hr className='my-4 border-slate-300' />

        <div className='flex justify-between font-semibold text-slate-800'>
          <span>Total:</span>
          <span className='text-purple-700'>£{totalPrice}</span>
        </div>
      </div>
    </aside>
  );
}
