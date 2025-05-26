export default function Basket() {
  return (
    <>
      <div className='invoice'>
        <article>
          <br />
          <br />
          <br />
          <h1>Basket</h1>
          <div className='container'>
            <table>
              <thead>
                <tr>
                  <th className='th1'>Movie</th>
                  <th className='th2'>Days</th>
                  <th className='th3'>Price</th>
                </tr>
              </thead>
              <tbody id='basket' />
            </table>
            <hr />
            <div className='right-align-text'>
              <strong>Total Price:</strong> £<span id='total-price'>0.00</span>
            </div>
            <hr />
            <button className='btn pay' onClick='CheckBasket()'>
              Proceed to Checkout
            </button>
            <button className='btn clear' onClick='ClearBasket()'>
              Clear Basket
            </button>
          </div>
        </article>
      </div>
    </>
  );
}
