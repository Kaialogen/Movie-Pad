import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';

const saveBasketMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith('basket/')) {
    const basket = storeAPI.getState().basket.basket;
    sessionStorage.setItem('basket', JSON.stringify(basket));
  }

  return result;
};

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveBasketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
