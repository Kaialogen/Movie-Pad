// store/basketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basket: [],
  save: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    loadFromStorage(state) {
      state.basket = JSON.parse(sessionStorage.getItem('basket') ?? '[]');
      state.save = JSON.parse(sessionStorage.getItem('save') ?? '[]');
    },
    addItem(state, action) {
      state.basket.push(action.payload);
      state.save.push({ ...action.payload }); // assuming same structure
    },
    removeItem(state, action) {
      const index = state.basket.findIndex((item) => item.name === action.payload);
      if (index !== -1) {
        state.basket.splice(index, 1);
        state.save.splice(index, 1);
      }
    },
    increaseDays(state, action) {
      const index = state.basket.findIndex((item) => item.name === action.payload);
      if (index !== -1 && state.basket[index].rentDays < 30) {
        state.basket[index].rentDays += 1;
      }
    },
    decreaseDays(state, action) {
      const index = state.basket.findIndex((item) => item.name === action.payload);
      if (index !== -1) {
        if (state.basket[index].rentDays > 1) {
          state.basket[index].rentDays -= 1;
        } else {
          state.basket.splice(index, 1);
          state.save.splice(index, 1);
        }
      }
    },
    clearBasket(state) {
      state.basket = [];
      state.save = [];
    },
  },
});

export const { loadFromStorage, addItem, removeItem, increaseDays, decreaseDays, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;
