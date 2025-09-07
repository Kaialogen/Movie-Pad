import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store.ts';
import { MoviesProvider } from './context/MoviesContext.tsx';
import MainLayout from './MainLayout.tsx';
import { loadFromStorage } from './store/basketSlice.ts';

import HomePage from './pages/HomePage.tsx';
import CategoriesPage from './pages/CategoriesPage.tsx';
import HelpPage from './pages/HelpPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import BasketPage from './pages/BasketPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import Confirmation from './pages/ConfirmationPage.tsx';
import MoviePage from './pages/MoviePage.tsx';

function StoreInitialiser({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return <>{children}</>;
}

export default function App() {
  return (
    <MoviesProvider>
      <Provider store={store}>
        <StoreInitialiser>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/categories' element={<CategoriesPage />} />
                <Route path='/help' element={<HelpPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/basket' element={<BasketPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/order-confirmation' element={<Confirmation />} />
                <Route path='/movie/:id' element={<MoviePage />} />
                <Route path='*' element={<HomePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </StoreInitialiser>
      </Provider>
    </MoviesProvider>
  );
}
