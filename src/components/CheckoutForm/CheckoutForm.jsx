import { FaUser, FaEnvelope, FaAddressCard, FaCcVisa, FaCcAmex, FaCcMastercard, FaCcDiscover } from 'react-icons/fa';
import { BiSolidInstitution } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function CheckoutForm() {
  const navigate = useNavigate();

  // State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCVV] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order-confirmation');
  };

  const inputClass =
    'w-full px-4 py-2 border border-purple-500 text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-700';

  const labelClass = 'flex items-center gap-2 text-sm font-medium mb-1 mt-4';

  return (
    <div className='bg-slate-100 w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-lg font-inter'>
      <form onSubmit={handleSubmit} className='text-slate-900 space-y-6'>
        {/* Billing Info */}
        <section>
          <h3 className='text-2xl font-semibold mb-4 text-purple-700'>Billing Address</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label htmlFor='fname' className={labelClass}>
                <FaUser /> First Name
              </label>
              <input
                type='text'
                id='fname'
                name='firstname'
                placeholder='John'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='lname' className={labelClass}>
                <FaUser /> Last Name
              </label>
              <input
                type='text'
                id='lname'
                name='lastname'
                placeholder='Doe'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='email' className={labelClass}>
                <FaEnvelope /> Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='john@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='adr' className={labelClass}>
                <FaAddressCard /> Address
              </label>
              <input
                type='text'
                id='adr'
                name='address'
                placeholder='542 W. 15th Street'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='city' className={labelClass}>
                <BiSolidInstitution /> City
              </label>
              <input
                type='text'
                id='city'
                name='city'
                placeholder='New York'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='county' className={labelClass}>
                County
              </label>
              <input
                type='text'
                id='county'
                name='county'
                placeholder='West Midlands'
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='postcode' className={labelClass}>
                Postcode
              </label>
              <input
                type='text'
                id='postcode'
                name='postcode'
                placeholder='CV1 7AL'
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        {/* Card Info */}
        <section>
          <h3 className='text-2xl font-semibold mb-4 text-purple-700'>Card Info</h3>

          <label className='block text-sm font-semibold mb-2'>Accepted Cards</label>
          <div className='flex items-center gap-5 text-3xl mb-4'>
            <FaCcVisa className='text-blue-800' />
            <FaCcAmex className='text-blue-500' />
            <FaCcMastercard className='text-red-600' />
            <FaCcDiscover className='text-orange-500' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label htmlFor='cname' className={labelClass}>
                Name on Card
              </label>
              <input
                type='text'
                id='cname'
                name='cardname'
                placeholder='John Doe'
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='ccnum' className={labelClass}>
                Card Number
              </label>
              <input
                type='text'
                id='ccnum'
                name='cardnumber'
                placeholder='1111-2222-3333-4444'
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='expmonth' className={labelClass}>
                Expiration Month
              </label>
              <input
                type='text'
                id='expmonth'
                name='expmonth'
                placeholder='September'
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='expyear' className={labelClass}>
                Expiration Year
              </label>
              <input
                type='text'
                id='expyear'
                name='expyear'
                placeholder='2025'
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor='cvv' className={labelClass}>
                CVV
              </label>
              <input
                type='text'
                id='cvv'
                name='cvv'
                placeholder='352'
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        <div className='flex items-center gap-2 mt-6'>
          <input type='checkbox' name='sameadr' defaultChecked />
          <label className='text-sm'>Shipping address same as billing</label>
        </div>

        <button
          type='submit'
          className='mt-6 w-full md:w-1/3 mx-auto block bg-purple-700 text-white py-3 rounded-md hover:bg-purple-600 transition font-semibold'
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
