import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice.ts';
import { basketPersistenceMiddleware } from './persistenceMiddleware.ts';

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(basketPersistenceMiddleware),
});

export default store;
