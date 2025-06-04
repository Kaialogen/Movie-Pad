import { FaUser, FaEnvelope, FaAddressCard, FaCcVisa, FaCcAmex, FaCcMastercard, FaCcDiscover } from 'react-icons/fa';
import { BiSolidInstitution } from 'react-icons/bi';
import { Navigate } from 'react-router';

import './CheckoutForm.css';

export default function CheckoutForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    <Navigate to='/order-confirmation' replace={true} />;
  };

  return (
    <>
      <div className='checkout-form-col-75'>
        <div className='checkout-form-container'>
          <form onSubmit={handleSubmit}>
            <div className='checkout-form-row'>
              <div className='checkout-form-col-50'>
                <h3>Billing Address</h3>
                <label htmlFor='fname' className='checkout-form-label'>
                  <FaUser color='#2196f3' />
                  First Name
                </label>
                <input type='text' id='fname' name='firstname' placeholder='John' required />
                <label htmlFor='lname' className='checkout-form-label'>
                  <FaUser color='#2196f3' />
                  Last Name
                </label>
                <input type='text' id='lname' name='lastname' placeholder='Doe' required />
                <label htmlFor='email' className='checkout-form-label'>
                  <FaEnvelope color='#2196f3' />
                  Email
                </label>
                <input type='email' id='email' name='email' placeholder='john@example.com' required />
                <label htmlFor='adr' className='checkout-form-label'>
                  <FaAddressCard color='#2196f3' />
                  Address
                </label>
                <input type='text' id='adr' name='address' placeholder='542 W. 15th Street' required />
                <label htmlFor='city' className='checkout-form-label'>
                  <BiSolidInstitution color='#2196f3' />
                  City
                </label>
                <input type='text' id='city' name='city' placeholder='New York' required />
              </div>
            </div>
            <div className='checkout-form-row'>
              <div className='checkout-form-col-50'>
                <label htmlFor='county' className='checkout-form-label'>
                  County
                </label>
                <input type='text' id='county' name='county' placeholder='New York' required />
              </div>
              <div className='checkout-form-col-50'>
                <label htmlFor='postcode' className='checkout-form-label'>
                  Postcode
                </label>
                <input type='text' id='postcode' name='postcode' placeholder='CV1 7AL' required />
              </div>
            </div>

            <div className='checkout-form-col-50'>
              <h3>Card Info</h3>
              <label htmlFor='fname' className='checkout-form-label'>
                Accepted Cards
              </label>
              <div className='checkout-form-icons'>
                <FaCcVisa color='navy' />
                <FaCcAmex color='blue' />
                <FaCcMastercard color='red' />
                <FaCcDiscover color='orange' />
              </div>
              <label htmlFor='cname' className='checkout-form-label'>
                Name on Card
              </label>
              <input type='text' id='cname' name='cardname' placeholder='John Doe' required />
              <label htmlFor='ccnum' className='checkout-form-label'>
                Credit Card Number
              </label>
              <input type='text' id='ccnum' name='cardnumber' placeholder='1111-2222-3333-4444' required />
              <label htmlFor='expmonth' className='checkout-form-label'>
                Exp Month
              </label>
              <input type='text' id='expmonth' name='expmonth' placeholder='September' required />
              <div className='checkout-form-row'>
                <div className='checkout-form-col-50'>
                  <label htmlFor='expyear' className='checkout-form-label'>
                    Exp Year
                  </label>
                  <input type='text' id='expyear' name='expyear' placeholder='2023' required />
                </div>
                <div className='checkout-form-col-50'>
                  <label htmlFor='cvv' className='checkout-form-label'>
                    CVV
                  </label>
                  <input type='text' id='cvv' name='cvv' placeholder='352' required />
                </div>
              </div>
            </div>

            <label className='checkout-form-label'>
              <input type='checkbox' name='sameadr' checked='checked' />
              Shipping address same as billing
            </label>
            <input type='submit' value='Place Order' className='checkout-form-btn' />
          </form>
        </div>
      </div>
    </>
  );
}
