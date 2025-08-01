// components/ClearBasketButton/ClearBasketButton.js
import { useDispatch } from 'react-redux';
import { clearBasket } from '../../store/basketSlice';

export default function ClearBasketButton() {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearBasket());
  };

  return (
    <button className='btn clear' onClick={handleClear}>
      Clear Basket
    </button>
  );
}
