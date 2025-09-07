import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basket: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    loadFromStorage(state) {
      state.basket = JSON.parse(sessionStorage.getItem('basket') ?? '[]');
    },
    addItem(state, action) {
      const existing = state.basket.find((item) => item.id === action.payload.id);

      if (existing) {
        // Increment but clamp to 30
        existing.rentDays = Math.min(existing.rentDays + action.payload.rentDays, 30);
      } else {
        // Always clamp on new adds too
        state.basket.push({
          ...action.payload,
          rentDays: Math.min(action.payload.rentDays, 30),
        });
      }
    },
    removeItem(state, action) {
      state.basket = state.basket.filter((item) => item.id !== action.payload);
    },
    increaseDays(state, action) {
      const existing = state.basket.find((item) => item.id === action.payload);
      if (existing && existing.rentDays < 30) {
        existing.rentDays += 1;
      }
    },
    decreaseDays(state, action) {
      const existing = state.basket.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.rentDays > 1) {
          existing.rentDays -= 1;
        } else {
          // remove if rentDays would go below 1
          state.basket = state.basket.filter((item) => item.id !== action.payload);
        }
      }
    },
    clearBasket(state) {
      state.basket = [];
    },
  },
});

export const { loadFromStorage, addItem, removeItem, increaseDays, decreaseDays, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
