export const basketPersistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action); // Let the action proceed

  // List of basket actions that should trigger persistence
  const basketActionsToPersist = [
    'basket/addItem',
    'basket/removeItem',
    'basket/increaseDays',
    'basket/decreaseDays',
    'basket/clearBasket',
  ];

  if (basketActionsToPersist.includes(action.type)) {
    const state = storeAPI.getState().basket;
    sessionStorage.setItem('basket', JSON.stringify(state.basket));
    sessionStorage.setItem('save', JSON.stringify(state.save));
  }

  return result;
};
