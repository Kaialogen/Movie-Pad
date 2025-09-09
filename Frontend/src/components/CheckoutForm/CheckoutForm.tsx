import { FaUser, FaAddressCard, FaCcVisa, FaCcAmex, FaCcMastercard, FaCcDiscover } from 'react-icons/fa';
import { BiSolidInstitution } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  validateFirstName,
  validateLastName,
  validatePostcode,
  validateCardName,
  validateCardNumber,
  validateExpiry,
  validateCVV,
} from './CheckoutValidation';
import { toast } from 'sonner';

export default function CheckoutForm() {
  const navigate = useNavigate();
  const basket = useSelector((state: any) => state.basket.basket);

  const MovieId = basket.map((item: { id: number }) => item.id);
  const totalPrice = basket
    .reduce((sum: number, item: { price: number; rentDays: number }) => sum + item.price * item.rentDays, 0)
    .toFixed(2);
  const RentDays = basket.map((item: { rentDays: number }) => item.rentDays);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postcode, setPostcode] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cvv, setCVV] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFirstName(firstName)) {
      toast.error('Please enter a valid first name (at least 2 alphabetic characters).');
      return;
    }
    if (!validateLastName(lastName)) {
      toast.error('Please enter a valid last name (at least 2 alphabetic characters).');
      return;
    }
    if (!validatePostcode(postcode)) {
      toast.error('Please enter a valid postcode (3-10 alphanumeric characters).');
      return;
    }
    if (!validateCardName(cardName)) {
      toast.error('Please enter a valid name on card (at least 2 alphabetic characters).');
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      toast.error('Please enter a valid card number (13-19 digits).');
      return;
    }
    if (!validateExpiry(cardExp)) {
      toast.error('Please enter a valid card expiry date (MM/YY) that is not expired.');
      return;
    }
    if (!validateCVV(cvv)) {
      toast.error('Please enter a valid CVV (3 or 4 digits).');
      return;
    }

    // If all validations pass
    try {
      const response = await fetch('http://localhost:3000/api/orders/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          MovieId,
          RentDays,
          totalPrice,
          firstName,
          lastName,
          address,
          city,
          country,
          postcode,
          cardName,
          cardNumber,
          cardExp,
          cvv,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Order placement failed.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
      return;
    }

    toast.success('Order placed successfully!');
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
              <label htmlFor='country' className={labelClass}>
                Country
              </label>
              <input
                type='text'
                id='country'
                name='country'
                placeholder='United Kingdom'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
              <label htmlFor='CardExp' className={labelClass}>
                Card Expiry
              </label>
              <input
                type='text'
                id='CardExp'
                name='CardExp'
                placeholder='08/27'
                value={cardExp}
                onChange={(e) => setCardExp(e.target.value)}
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
