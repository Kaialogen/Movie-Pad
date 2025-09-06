import { useSelector } from 'react-redux';

export default function Confirmation() {
  const orderDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  interface item {
    id: number;
    name: string;
    price: number;
    rentDays: number;
  }

  const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);

  const basket = useSelector((state) => state.basket.basket);

  const totalPrice = basket.reduce((sum: number, item: item) => sum + item.price * item.rentDays, 0).toFixed(2);

  return (
    <main className='flex-grow m-auto w-auto p-20'>
      <h1 className='text-center text-2xl pb-5 pt-20 text-slate-50'>Thank You For Your Order!</h1>
      <div className='text-slate-900 rounded bg-slate-50 p-10'>
        <h2 className='text-center text-2xl'>Receipt</h2>
        <div id='payment-details' className='text-center'>
          <p className='details'>
            Date: {orderDate}
            <span id='payment-date' className='payment-date' />
          </p>
          <p className='details'>
            Order Reference:
            <span> # {random4DigitNumber}</span>
          </p>
          <p className='info'>
            <span id='payment-details-title' className='payment-detail' />
            <span id='fname' className='payment-detail' /> <span id='lname' className='payment-detail' />
            <span id='email' className='payment-detail' />
          </p>
          <p className='info'>
            <span id='adr' className='payment-detail' /> <span id='city' className='payment-detail' />
            <span id='county' className='payment-detail' />
            <span id='postcode' className='payment-detail' />
          </p>
          <p className='payment-info'>
            <span id='payment-details-card' className='payment-detail' />
            <span id='payment-details-cardNumber' className='payment-detail' />
          </p>
          <br />
          <div className='w-full m-auto p-8'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='text-left'>
                  <th>Movie</th>
                  <th>Days</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className='text-left' id='basket'>
                {basket.map((item: item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.rentDays}</td>
                    <td>£{(item.price * item.rentDays).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className='text-right font-bold mt-4'>
              <strong>Total Price:</strong> £<span id='total-price'>{totalPrice}</span>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </main>
  );
}
