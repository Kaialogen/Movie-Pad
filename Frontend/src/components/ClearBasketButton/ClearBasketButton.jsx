// components/ClearBasketButton/ClearBasketButton.js
import { useDispatch } from 'react-redux';
import { clearBasket } from '../../store/basketSlice';

export default function ClearBasketButton() {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearBasket());
  };

  return (
    <button
      className='inline-block px-4 py-2 bg-red-600 text-slate-50 rounded pointer hover:bg-red-400'
      onClick={handleClear}
    >
      Clear Basket
    </button>
  );
}
