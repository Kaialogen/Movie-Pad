export default function ClearBasketButton() {
  // Function to clear the basket
  const ClearBasket = () => {
    sessionStorage.setItem('basket', '[]');
    window.location.reload();
  };

  return (
    <button className='btn clear' onClick={ClearBasket}>
      Clear Basket
    </button>
  );
}
