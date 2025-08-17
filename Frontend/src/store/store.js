import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';
import { basketPersistenceMiddleware } from './persistenceMiddleware';

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(basketPersistenceMiddleware),
});

export default store;
