export default function AddToBasketButton({ movie }) {
  return (
    <button className='AddToBasketButton' onClick={() => alert(`Item: ${movie} added to basket`)}>
      Add to Basket
    </button>
  );
}
